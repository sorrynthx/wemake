import { createClient } from "@supabase/supabase-js";
import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "database.types";

// -------------------------------------------------------------
// Supabase 클라이언트 (앱 전역에서 재사용)
// - 브라우저와 서버(서버 액션/route handler) 모두에서 사용할 수 있는
//   순수 supabase-js 클라이언트 인스턴스다.
// - 목적: 데이터베이스 스키마를 타입으로 연결해서
//   쿼리 자동완성과 컴파일 타임 타입체크를 강하게 보장.
// -------------------------------------------------------------

/**
 * Database
 * - Supabase가 생성한 스키마 타입(SupabaseDatabase)을 기반으로
 *   현 프로젝트에서 원하는 대로 일부 View의 Row 타입을 "정제"한다.
 *
 * 단계별 설명:
 *  1) MergeDeep<A, B>
 *     - A(원본 스키마: SupabaseDatabase)에 B(우리의 오버라이드)를 깊은 병합으로 합친다.
 *       → 전체 스키마는 그대로 유지하면서 특정 경로만 정확히 바꿀 수 있음.
 *
 *  2) SetNonNullable<T>
 *     - 특정 View의 Row 안에 있는 모든 필드에서 `null | undefined` 가능성을 제거한다.
 *       → 쿼리 후 사용 시 "널 체크" 부담을 줄이고, 실데이터가 항상 채워진다고 가정하는 모델에 맞춘다.
 *
 *  3) SetFieldType<T, K, V>
 *     - (2)에서 모두 non-null로 바꾼 뒤, 예외적으로 `author_avatar` 필드만 다시
 *       `string | null`로 되돌린다. 실데이터 상 아바타가 비어있을 수 있다는 도메인 규칙을 반영.
 *
 * 참고(비유): Spring Data JPA에서 엔티티를 그대로 쓰지 않고
 *             Projection/DTO로 shape을 조정해 받는 것과 유사한 타입 정제 패턴.
 */
// 원본: Supabase가 CLI로 생성해 준 타입의 경로를 그대로 인덱싱해 사용한다.
//       ["public"]["Views"]["community_post_list_view"]["Row"] 경로가 바로 해당 View의 결과 Row 타입.

type Database = MergeDeep<
  SupabaseDatabase,
  {
    public: {
      Views: {
        community_post_list_view: {
          Row: SetFieldType<
            SetNonNullable<
              SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]
            >,
            "author_avatar",
            string | null
          >;
        };
        gpt_ideas_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["gpt_ideas_view"]["Row"]
          >;
        };
      };
    };
  }
>;

/**
 * createClient<Database>(url, anonKey)
 * - 제네릭 파라미터로 위에서 정의한 Database를 넘김으로써,
 *   `.from("테이블명")` 이후 체이닝되는 모든 쿼리에 타입 안전성이 적용된다.
 *
 * ⚠️ 환경변수 주의:
 *   - 브라우저에서 사용할 클라이언트라면 공개 가능한 키만 노출해야 하므로
 *     일반적으로 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`를 쓴다.
 *   - 현재는 non-null 단언(`!`)으로 강제하지만, 누락 시 런타임에서 터질 수 있다.
 *     운영 배포라면 안전 가드(주석 예시)를 적용하는 걸 권장.
 *
 *   // 예시) 보다 안전한 초기화 패턴
 *   // const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env;
 *   // if (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY) {
 *   //   throw new Error("Supabase env is missing");
 *   // }
 *   // const client = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);
 */
const client = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

/**
 * export default client
 * - 어디서든 `import client from "@/app/supa-client"` 형태로 불러서
 *   `client.from("...")`로 쿼리를 날린다.
 * - 세션 기반 인증이 필요한 RSC/서버 핸들러에선 `@supabase/auth-helpers-nextjs`
 *   전용 클라이언트를 별도 파일로 두는 패턴도 흔하다.
 */
export default client;
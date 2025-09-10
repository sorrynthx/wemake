import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
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

export type Database = MergeDeep<
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
        product_overview_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["product_overview_view"]["Row"]
          >;
        };
        community_post_detail: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["community_post_detail"]["Row"]
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


export const browserClient = createBrowserClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const makeSSRClient = (request: Request) => {
  const headers = new Headers();
  const serverSideClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = parseCookieHeader(request.headers.get("Cookie") ?? "");
          // 쿠키 값이 undefined인 경우 빈 문자열로 변환하여 타입 안정성 확보
          return cookies.map(cookie => ({
            name: cookie.name,
            value: cookie.value ?? ""
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            );
          });
        },
      },
    }
  );

  return {
    client: serverSideClient,
    headers,
  };
};

export default browserClient;
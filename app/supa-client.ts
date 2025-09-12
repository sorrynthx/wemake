/*
============================================================
[Supabase Client Flow (Browser & Server)]
============================================================

1) Browser 렌더링(클라이언트 컴포넌트/훅/이벤트 핸들러 등)
   - `browserClient` 사용
   - 환경변수(SUPABASE_URL, SUPABASE_ANON_KEY)로 초기화된 순수 브라우저 클라이언트
   - 예시)
     // const { data } = await browserClient.from("table").select("*")

2) Server 렌더링(서버 액션/route handler/loader 등)
   - 요청(Request)마다 `makeSSRClient(request)` 호출 → `{ client, headers }` 반환
   - `client`로 DB 액세스, `headers`는 응답으로 쿠키 전파
   - 예시)
     // const { client, headers } = makeSSRClient(request)
     // const { data } = await client.from("table").select("*")
     // return new Response(JSON.stringify(data), { headers })

3) 쿠키 처리(SSR 전용)
   - `cookies.getAll()` : 요청의 Cookie 헤더를 안전하게 파싱
   - `cookies.setAll()` : Supabase가 설정한 쿠키를 `Set-Cookie` 헤더로 모아 응답에 반영

4) 타입 안전성
   - `Database` 타입을 통해 스키마를 엄격히 모델링
   - 일부 View Row를 non-null로 정제하고 특정 필드(author_avatar)는 다시 `string | null` 허용

※ 스프링(Spring) 진영 비유:
   - JPA 엔티티를 그대로 노출하지 않고 DTO/Projection으로 가공하듯,
     Supabase 스키마 타입을 프로젝트 요구에 맞게 정제해 사용하는 패턴
============================================================
*/
import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "database.types";

/**
 * 프로젝트 전역 DB 스키마 타입
 * - 원본: `SupabaseDatabase`(생성된 타입)
 * - 목적: View Row의 null 가능성 축소 및 특정 필드 예외 재정의
 * - 효과: 오타/잘못된 필드 접근을 컴파일 타임에 조기 차단
 */
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

/**
 * 브라우저 전용 Supabase 클라이언트
 * 사용처: 클라이언트 컴포넌트, 이벤트 핸들러, CSR 훅 등
 * 특징: 요청 사이에 공유되는 전역 인스턴스 (보안 민감 로직은 서버에서 처리 권장)
 */
export const browserClient = createBrowserClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

/**
 * SSR용 Supabase 클라이언트 factory
 * 사용 패턴(예시):
 *   const { client, headers } = makeSSRClient(request)
 *   const { data, error } = await client.from("table").select("*")
 *   return new Response(JSON.stringify({ data, error }), { headers })
 * 주의: 요청(Request)마다 새로운 인스턴스를 생성해야 안전함
 */
export const makeSSRClient = (request: Request) => {
  // 1) SSR 응답에 쿠키를 넘겨주기 위해 누적할 Headers 컨테이너
  const headers = new Headers();
  // 2) 요청 스코프의 서버 클라이언트 생성 (쿠키 어댑터 연결)
  const serverSideClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // 안전한 쿠키 파싱
          // - value가 `undefined`일 수 있으므로 빈 문자열로 치환하여 런타임 에러 방지
          const cookies = parseCookieHeader(request.headers.get("Cookie") ?? "");
          // 쿠키 값이 undefined인 경우 빈 문자열로 변환하여 타입 안정성 확보
          return cookies.map(cookie => ({
            name: cookie.name,
            value: cookie.value ?? ""
          }));
        },
        setAll(cookiesToSet) {
          // Supabase가 설정한 모든 쿠키를 SSR 응답 헤더로 모아서 전달
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

  // 3) 호출자에게 서버용 client와, 최종 응답에 실을 headers를 함께 반환
  return {
    client: serverSideClient,
    headers,
  };
};

// 기본 내보내기: 브라우저 환경에서의 편의 사용을 위해 제공
export default browserClient;
import z from "zod"; // 데이터 검증을 위한 스키마 라이브러리
import type { Route } from "./+types/search-page";
import { data, Form } from "react-router";
import { HeroSection } from "~/common/components/hero-section";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";

// 메타 데이터 함수: 페이지의 제목과 설명을 설정
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Search Products | wemake" },
    { name: "description", content: "Search for products" },
  ]
}

// URL 검색 파라미터를 검증하기 위한 스키마 정의
// Zod 라이브러리를 사용하여 타입 안전성과 런타임 검증을 보장
const paramsSchema = z.object({
  // query: 검색어 (문자열, 선택사항, 기본값은 빈 문자열)
  query: z.string().optional().default(""),
  // page: 페이지 번호 (숫자로 변환, 선택사항, 기본값은 1)
  // z.coerce.number()는 문자열을 자동으로 숫자로 변환해줌
  page: z.coerce.number().optional().default(1),
});

// 로더 함수: 페이지 로드 시 서버에서 데이터를 가져오는 함수
export function loader({ request }: Route.LoaderArgs) {
  // URL 객체를 생성하여 검색 파라미터에 접근
  const url = new URL(request.url);
  
  // URL의 검색 파라미터(searchParams)를 객체로 변환하고 스키마로 검증
  // Object.fromEntries(url.searchParams)는 URLSearchParams를 일반 객체로 변환
  // 예: ?query=react&page=2 → { query: "react", page: "2" }
  const { success, data: parsedData } = paramsSchema.safeParse(Object.fromEntries(url.searchParams));
  
  // 검증 실패 시 에러를 던짐
  // safeParse는 { success: boolean, data: parsedData | ZodError } 형태를 반환
  if (!success) { 
    throw data({ error_code: "invalid_params" }, { status: 400 }) 
  }
  
  // TODO: 여기에 실제 검색 로직 구현 필요
  // 예: 데이터베이스에서 검색어와 페이지에 맞는 제품들을 가져오기
  return {
    query: parsedData.query,
    page: parsedData.page,
    results: [], // 검색 결과 배열 (현재는 빈 배열)
    totalResults: 0, // 전체 검색 결과 수
    totalPages: 0 // 전체 페이지 수
  };
}

// 메인 컴포넌트: 검색 페이지를 렌더링
export default function SearchPage({ loaderData }: Route.ComponentProps) {
  // loaderData에서 검색 관련 데이터를 가져옴
  const { query, page, results, totalResults, totalPages } = loaderData || {};

  return (
    <div className="space-y-10">
      {/* 히어로 섹션: 페이지 제목과 부제목 */}
      <HeroSection 
        title="Search"
        subtitle="Search for Products! by title or description"
      />
      
      {/* 검색 입력 폼: 사용자가 검색어를 입력하고 검색을 실행 */}
      <Form className="flex justify-center max-w-screen-sm items-center gap-2 mx-auto">
        <Input 
          name="query" 
          placeholder="Search for products" 
          className="text-lg" 
          defaultValue={query} // 이전 검색어가 있으면 기본값으로 설정
        />
        <Button type="submit">Search</Button>
      </Form>

      {/* 검색 결과가 있을 때만 결과 개수 표시 */}
      {query && (
        <div className="text-center text-gray-600">
          "{query}"에 대한 검색 결과: {totalResults}개
        </div>
      )}

      {/* 제품 카드 목록: 검색 결과 또는 기본 제품 목록을 표시 */}
      <div className="space-y-10 w-full max-w-screen-md mx-auto">
        {/* 
          현재는 샘플 데이터를 표시
          실제로는 loader에서 가져온 results 배열을 사용해야 함
        */}
        {
          Array.from({ length: 10 }, (_, index) => (
            <ProductCard
              key={index}
              productId={`product-${index + 1}`}
              name={`Product ${index + 1}`}
              description={`This is a sample description for product ${index + 1}`}
              commentCount={Math.floor(Math.random() * 50) + 5}
              viewCount={Math.floor(Math.random() * 200) + 20}
              upvoteCount={Math.floor(Math.random() * 300) + 50}
            />
            ))
        }
      </div>

      {/* 페이지네이션: 검색 결과가 많을 때 페이지를 나누어 표시 */}
      <ProductPagination 
        totalPages={totalPages || 10}
      />

    </div>
  );
}

import { DateTime } from "luxon"; // 날짜 관련 라이브러리
import type { Route } from "./+types/yearly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from 'zod'; // 파라미터 유효성 체크 라이브러리
import { HeroSection } from "~/common/components/hero-section";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";

// 메타 데이터 함수: 페이지의 제목과 메타 정보를 설정
export const meta: Route.MetaFunction = ({ params }) => {
  // URL 파라미터에서 year를 가져와서 연도 날짜 객체 생성
  const date = DateTime.fromObject({
    year: Number(params.year)
  })
  .setZone("Asia/Seoul")  // 한국 시간대 설정
  .setLocale("ko");       // 한국어 로케일 설정
  
  // 페이지 제목 반환: "The best of [연도년] | wemake" 형식
  return [
    {"title": `The best of ${date.toFormat('yyyy년')} | wemake` }
  ]
}

// URL 파라미터로 전달된 year를 숫자로 강제 변환하고 유효성을 검사하기 위한 스키마 정의
const paramsSchema = z.object({
  year: z.coerce.number()  // year를 숫자로 변환
});

export const loader = ({ params }: Route.LoaderArgs) => {
  // safeParse를 사용하여 params를 검증
  // safeParse는 { success: boolean, data: parsedData | ZodError } 형태를 반환
  // 여기서 구조 분해 할당을 할 때 data 프로퍼티를 parsedData라는 변수명으로 변경하여 사용
  // 즉, parsedData는 원래 data 프로퍼티의 값을 담고 있음
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  
  // 파라미터 검증 실패 시 에러를 던짐
  if (!success) {
    // react-router의 data 함수를 사용해 에러 메시지와 상태코드 400을 포함한 응답 생성
    throw data(
      { 
        error_code: "INVALID_PARAMETERS",
        message: "유효하지 않은 연도 파라미터입니다. year는 숫자여야 합니다.",
        details: "URL에 올바른 연도 형식(예: /2025)을 입력해주세요."
      }, 
      { status: 400 }
    );
  }
  
  // Luxon의 DateTime.fromObject를 사용해 parsedData 객체를 연도 날짜 객체로 변환
  // Asia/Seoul 타임존으로 설정
  const date = DateTime.fromObject({
    year: parsedData.year
  }).setZone("Asia/Seoul");
  
  // 변환된 연도 날짜 객체가 유효하지 않은 경우 (예: 999999 같은 비현실적인 연도)
  if (!date.isValid) {
    throw data(
      {
        error_code: "INVALID_YEAR_VALUE",
        message: "존재하지 않는 연도입니다.",
        details: `입력된 연도 ${parsedData.year}는 유효하지 않습니다.`,
        suggested_date: "올바른 연도 형식(예: 2025)을 입력해주세요."
      }, 
      { status: 400 }
    );
  } 
  
  // 현재 연도를 Asia/Seoul 타임존 기준으로 가져오고, 연도의 시작으로 초기화 (startOf('year'))
  const currentYear = DateTime.now().setZone("Asia/Seoul").startOf("year");
  
  // 입력된 연도가 현재 연도보다 미래인 경우 에러 처리
  if (date > currentYear) {
    throw data(
      {
        error_code: "FUTURE_YEAR_NOT_ALLOWED",
        message: "미래 연도는 허용되지 않습니다.",
        details: `입력된 연도 ${date.toFormat('yyyy년')}는 현재 연도(${currentYear.toFormat('yyyy년')}) 이후입니다.`,
        suggested_date: "현재 연도 또는 과거 연도를 선택해주세요."
      },
      { status: 400 }
    )
  }

  // loader 함수의 반환값: 유효한 연도 정보를 포함하는 객체 반환
  return {
    ...parsedData
  }
}

// React 컴포넌트: loader에서 전달받은 데이터를 props로 받아 화면에 렌더링
export default function YearlyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  
  // loaderData에서 year를 가져와서 연도 날짜 객체 생성
  const urlDate = DateTime.fromObject({ year: loaderData.year });
  // 이전 연도와 다음 연도 계산
  const previousYear = urlDate.minus({ year: 1 });
  const nextYear = urlDate.plus({ year: 1 });
  // 현재 연도인지 확인
  const isCurrentYear = urlDate.equals(DateTime.now().startOf("year"));

  return (
    <div className="space-y-10">
      
      {/* Hero section */}
      <HeroSection 
        title={`The best of ${urlDate.toFormat('yyyy년')}`}
      />
      
      {/* 이전/다음 연도 이동 버튼 */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
            &larr; {previousYear.toFormat('yyyy년')}
          </Link>
        </Button>
        {
          !isCurrentYear ? (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
            {nextYear.toFormat('yyyy년')} &rarr;
          </Link>
          </Button>
          ) : null
        }
      </div>
      
      {/* 제품 카드 목록 */}
      <div className="space-y-10 w-full max-w-screen-md mx-auto">
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

      {/* 페이지네이션 */}
      <ProductPagination 
        totalPages={10}
      />

    </div>
  );
}

// 에러 경계 컴포넌트: 라우트 에러 및 일반 에러 처리
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // react-router에서 발생한 에러인 경우 (isRouteErrorResponse가 true)
  if (isRouteErrorResponse(error)) {
    return (
      <main className="pt-16 p-4 container mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">
                  {error.data.error_code}
                </h3>
              </div>
            </div>
            <div className="text-red-700">
              <p className="font-medium mb-2">{error.data.message}</p>
              {error.data.details && (
                <p className="text-sm mb-2">{error.data.details}</p>
              )}
              {error.data.suggested_date && (
                <p className="text-sm text-red-600 bg-red-100 p-2 rounded">
                  💡 {error.data.suggested_date}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 일반적인 JS Error 객체인 경우
  if (error instanceof Error) {
    return (
      <main className="pt-16 p-4 container mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-red-800 mb-2">오류가 발생했습니다</h3>
            <p className="text-red-700">{error.message}</p>
          </div>
        </div>
      </main>
    );
  }

  // 그 외 알 수 없는 에러 발생 시 기본 메시지 출력
  return (
    <main className="pt-16 p-4 container mx-auto">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">알 수 없는 오류가 발생했습니다</h3>
          <p className="text-gray-600">예상치 못한 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    </main>
  );
}

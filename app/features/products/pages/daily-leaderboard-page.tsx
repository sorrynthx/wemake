import { DateTime } from "luxon"; // 날짜 관련 라이브러리
import type { Route } from "./+types/daily-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from 'zod'; // 파라미터 유효성 체크 라이브러리
import { HeroSection } from "~/common/components/hero-section";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";

// URL 파라미터로 전달된 year, month, day를 숫자로 강제 변환하고 유효성을 검사하기 위한 스키마 정의
const paramsSchema = z.object({
  year: z.coerce.number(),  // year를 숫자로 변환
  month: z.coerce.number(), // month를 숫자로 변환
  day: z.coerce.number()    // day를 숫자로 변환
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
        message: "유효하지 않은 날짜 파라미터입니다. year, month, day는 숫자여야 합니다.",
        details: "URL에 올바른 날짜 형식(예: /2024/12/25)을 입력해주세요."
      }, 
      { status: 400 }
    );
  }
  
  // Luxon의 DateTime.fromObject를 사용해 parsedData 객체를 날짜 객체로 변환
  // Asia/Seoul 타임존으로 설정
  const date = DateTime.fromObject(parsedData).setZone("Asia/Seoul");
  
  // 변환된 날짜 객체가 유효하지 않은 경우 (예: 2023-02-30 같은 날짜)
  if (!date.isValid) {
    throw data(
      {
        error_code: "INVALID_DATE_VALUE",
        message: "존재하지 않는 날짜입니다.",
        details: `입력된 날짜 ${parsedData.year}-${parsedData.month}-${parsedData.day}는 유효하지 않습니다.`,
        suggested_date: "올바른 날짜 형식(예: 2024-12-25)을 입력해주세요."
      }, 
      { status: 400 }
    );
  } 
  
  // 현재 날짜를 Asia/Seoul 타임존 기준으로 가져오고, 시간은 00:00:00으로 초기화 (startOf('day'))
  const today = DateTime.now().setZone("Asia/Seoul").startOf("day");
  
  // 입력된 날짜가 현재 날짜보다 미래인 경우 에러 처리
  if (date > today) {
    throw data(
      {
        error_code: "FUTURE_DATE_NOT_ALLOWED",
        message: "미래 날짜는 허용되지 않습니다.",
        details: `입력된 날짜 ${date.toFormat('yyyy년 MM월 dd일')}는 오늘(${today.toFormat('yyyy년 MM월 dd일')}) 이후입니다.`,
        suggested_date: "오늘 또는 과거 날짜를 선택해주세요."
      },
      { status: 400 }
    )
  }

  // loader 함수의 반환값: 유효한 날짜 객체를 포함하는 객체 반환
  return {
    ...parsedData
  }
}

// React 컴포넌트: loader에서 전달받은 데이터를 props로 받아 화면에 렌더링
export default function DailyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  
  const urlDate = DateTime.fromObject(loaderData);
  const previousDay = urlDate.minus({ day: 1 });
  const nextDay = urlDate.plus({ day: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("day"));

  return (
    <div className="space-y-10">
      
      {/* Hero section */}
      <HeroSection 
        title={`The best products of ${urlDate.toLocaleString(DateTime.DATE_MED)}`}
      />
      
      {/* Next, Previous Button */}
      <div className="flex imtes-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`}>
            &larr; {previousDay.toLocaleString(DateTime.DATE_MED)}
          </Link>
        </Button>
        {
          !isToday ? (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}>
            {nextDay.toLocaleString(DateTime.DATE_MED)} &rarr;
          </Link>
          </Button>
          ) : null
        }
      </div>
      
      {/* Products Card */}
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

      {/* 페이징 */}
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

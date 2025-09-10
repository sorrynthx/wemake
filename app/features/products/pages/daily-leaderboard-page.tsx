import { DateTime } from "luxon";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { HeroSection } from "~/common/components/hero-section";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import { PAGE_SIZE } from "../contants";
import type { Route } from "./+types/daily-leaderboard-page";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

/**
 * meta 함수는 페이지의 메타데이터(주로 페이지 타이틀)를 생성합니다.
 * @param param0 params: URL 파라미터로부터 연도, 월, 일을 받아서 DateTime 객체를 생성합니다.
 * @returns 페이지 타이틀을 포함하는 객체 배열을 반환합니다.
 * 
 * 이 함수는 페이지가 로드될 때 해당 날짜에 맞는 타이틀을 동적으로 설정하기 위해 사용됩니다.
 * luxon 라이브러리를 사용해 날짜를 'Asia/Seoul' 타임존과 한국어 로케일로 설정하여 정확한 날짜 표현을 보장합니다.
 */
export const meta: Route.MetaFunction = ({ params }) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month),
    day: Number(params.day),
  })
    .setZone("Asia/Seoul")
    .setLocale("ko");
  return [
    {
      title: `The best products of ${date.toLocaleString(
        DateTime.DATE_MED
      )} | wemake`,
    },
  ];
};

/**
 * loader 함수는 서버사이드에서 데이터를 미리 로드하는 역할을 합니다.
 * @param param0 params: URL 파라미터, request: 요청 객체
 * @returns 해당 날짜에 맞는 상품 목록과 페이지네이션 정보를 포함한 데이터를 반환합니다.
 * 
 * 주요 기능:
 * - URL 파라미터 검증: zod 스키마를 사용해 year, month, day 값이 올바른지 검증합니다.
 * - 날짜 유효성 검사: luxon DateTime 객체로 변환 후 유효한 날짜인지 확인합니다.
 * - 미래 날짜 접근 방지: 현재 날짜보다 미래인 경우 에러를 발생시킵니다.
 * - 데이터 조회: 지정된 날짜 범위 내의 상품 데이터를 PAGE_SIZE 단위로 조회합니다.
 * - 총 페이지 수 조회: 해당 날짜 범위의 총 페이지 수를 계산합니다.
 */
export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data(
      {
        error_code: "invalid_params",
        message: "Invalid params",
      },
      { status: 400 }
    );
  }
  const date = DateTime.fromObject(parsedData).setZone("Asia/Seoul");
  if (!date.isValid) {
    throw data(
      {
        error_code: "invalid_date",
        message: "Invalid date",
      },
      {
        status: 400,
      }
    );
  }
  const today = DateTime.now().setZone("Asia/Seoul").startOf("day");
  if (date > today) {
    throw data(
      {
        error_code: "future_date",
        message: "Future date",
      },
      { status: 400 }
    );
  }
  const url = new URL(request.url);
  const { client, headers } = makeSSRClient(request);
  const products = await getProductsByDateRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page") || 1),
  });
  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
  });
  return {
    products,
    totalPages,
    ...parsedData,
  };
};

export default function DailyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
    day: loaderData.day,
  });
  const previousDay = urlDate.minus({ days: 1 });
  const nextDay = urlDate.plus({ days: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("day"));
  return (
    <div className="space-y-10">
      <HeroSection
        title={`The best products of ${urlDate.toLocaleString(
          DateTime.DATE_MED
        )}`}
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link
            to={`/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`}
          >
            &larr; {previousDay.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link
              to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}
            >
              {nextDay.toLocaleString(DateTime.DATE_SHORT)} &rarr;
            </Link>
          </Button>
        ) : null}
      </div>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  );
}

/**
 * ErrorBoundary 컴포넌트는 페이지 렌더링 중 발생한 에러를 처리하고 사용자에게 알리는 역할을 합니다.
 * @param param0 error: 발생한 에러 객체
 * @returns 에러 메시지를 포함하는 JSX를 반환합니다.
 * 
 * 기능:
 * - react-router의 isRouteErrorResponse를 사용해 라우트 에러인지 확인 후, 에러 코드와 메시지를 보여줍니다.
 * - 일반 Error 객체인 경우 에러 메시지를 출력합니다.
 * - 그 외의 예기치 않은 에러는 'Unknown error' 메시지를 표시합니다.
 */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data.message} / {error.data.error_code}
      </div>
    );
  }
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }
  return <div>Unknown error</div>;
}
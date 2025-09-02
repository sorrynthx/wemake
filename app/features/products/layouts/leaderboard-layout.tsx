/*********************************************************************************
 * 이 파일은 제품 리더보드 페이지의 레이아웃을 정의합니다.
 * React Router의 Outlet을 사용하여 중첩된 라우트 컴포넌트를 렌더링하며,
 * URL 쿼리 파라미터에서 페이지 번호를 검증하고 로딩 시 처리하는 loader 함수를 포함합니다.
 *********************************************************************************/

import { Outlet, data } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/leaderboard-layout";

// 페이지 번호 쿼리 파라미터를 검증하는 스키마입니다.
// page는 숫자이며 1 이상의 값이어야 하고, 없으면 기본값 1을 사용합니다.
// 이를 통해 클라이언트가 잘못된 페이지 번호를 요청하는 것을 방지합니다.
const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

// loader 함수는 라우트가 로드될 때 호출됩니다.
// 요청 URL에서 쿼리 파라미터를 추출하여 searchParamsSchema로 검증하고 파싱합니다.
// 검증에 실패하면 400 상태 코드와 함께 적절한 에러 메시지를 포함한 예외를 던집니다.
// 이를 통해 잘못된 쿼리 파라미터로 인한 잘못된 접근을 방지합니다.
export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error_code: "invalid_page",
        message: "Invalid page",
      },
      { status: 400 }
    );
  }
};

// LeaderboardLayout 컴포넌트는 중첩된 라우트 컴포넌트를 렌더링하는 역할을 합니다.
// React Router의 Outlet 컴포넌트를 사용하여 하위 라우트가 이 위치에 삽입됩니다.
export default function LeaderboardLayout() {
  return <Outlet />;
}
// Outlet 컴포넌트 import (react-router에서 중첩 라우팅된 컴포넌트 표시용)
import { Outlet } from "react-router";
import { FlickeringGrid } from "~/common/components/ui/flickering-grid";

// 인증(Auth) 관련 레이아웃 컴포넌트
export default function AuthLayout() {
  return (
    // 전체 페이지를 2개의 컬럼(grid)으로 구성, 화면 전체 높이 사용
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      {/* 좌측 영역: 그라디언트 배경 */}
      <div>
        <FlickeringGrid
          squareSize={4}
          gridGap={5}
          maxOpacity={0.5}
          flickerChance={0.2}
          color="#E11D49"
        />
      </div>
      {/* 우측 영역: 중첩 라우트 페이지 (Login, Join 등) */}
      <Outlet />
    </div>
  );
}
// React 및 라이브러리에서 필요한 아이콘과 라우터 훅, 컴포넌트들을 import 합니다.
import { HomeIcon, PackageIcon, RocketIcon, SparklesIcon } from "lucide-react";
// React Router에서 Link, Outlet, useLocation 훅을 import 합니다.
import { Link, Outlet, useLocation } from "react-router";
// 커스텀 사이드바 UI 컴포넌트들을 import 합니다.
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "~/common/components/ui/sidebar";

// DashboardLayout 컴포넌트는 대시보드 페이지의 레이아웃 역할을 합니다.
export default function DashboardLayout() {
  // 현재 경로 정보를 가져오는 useLocation 훅을 사용합니다.
  const location = useLocation();

  return (
    // SidebarProvider는 사이드바 관련 상태를 관리하는 컨텍스트 제공자입니다.
    // 클래스명으로 flex 레이아웃과 최소 높이를 설정합니다.
    <SidebarProvider className="flex min-h-full">
      {/* Sidebar 컴포넌트는 사이드바 영역을 나타내며 floating 스타일 변형을 적용합니다. */}
      <Sidebar className="pt-16" variant="floating">
        {/* SidebarContent는 사이드바 내부 콘텐츠를 감싸는 컴포넌트입니다. */}
        <SidebarContent>
          {/* SidebarGroup은 사이드바 내 메뉴 그룹을 나타냅니다. */}
          <SidebarGroup>
            {/* SidebarMenu는 메뉴 리스트를 감싸는 컴포넌트입니다. */}
            <SidebarMenu>
              {/* SidebarMenuItem은 각각의 메뉴 항목을 나타냅니다. */}
              <SidebarMenuItem>
                {/* SidebarMenuButton은 메뉴 버튼 역할을 하며 asChild 속성으로 하위 컴포넌트를 버튼처럼 동작하게 만듭니다.
                    isActive 속성으로 현재 경로와 비교하여 활성화 상태를 지정합니다. */}
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/my/dashboard"}
                >
                  {/* Link 컴포넌트는 SPA 내에서 경로 이동을 담당합니다. */}
                  <Link to="/my/dashboard">
                    {/* 아이콘과 텍스트를 포함한 메뉴 항목을 구성합니다. */}
                    <HomeIcon className="size-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/my/dashboard/ideas"}
                >
                  <Link to="/my/dashboard/ideas">
                    <SparklesIcon className="size-4" />
                    <span>Ideas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          {/* 두 번째 메뉴 그룹: Product Analytics 관련 메뉴 */}
          <SidebarGroup>
            {/* SidebarGroupLabel은 그룹의 제목을 표시합니다. */}
            <SidebarGroupLabel>Product Analytics</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/my/dashboard/products/1">
                    <RocketIcon className="size-4" />
                    <span>Product 1</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {/* 사이드바 옆에 메인 콘텐츠 영역을 구성하며 Outlet 컴포넌트로 하위 라우트 컴포넌트를 렌더링합니다. */}
      <div className="w-full h-full">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
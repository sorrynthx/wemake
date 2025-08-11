import { Link } from "react-router"; // 페이지 이동을 위한 링크 컴포넌트

// 아래는 UI에서 사용하는 네비게이션 메뉴 관련 컴포넌트들
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "~/common/components/ui/navigation-menu";

// 드롭다운 메뉴 관련 UI 컴포넌트
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";

import { Separator } from "~/common/components/ui/separator"; // 수직 구분선
import { cn } from "~/lib/utils"; // 클래스명을 조건부로 합치는 유틸 함수 (className 헬퍼)
import { Button } from "./ui/button"; // 공통 버튼 컴포넌트 (asChild로 Link와 결합 가능)
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"; // 사용자 프로필 이미지를 표시하는 컴포넌트
import {
  BarChart3Icon,
  BellIcon,
  LogOutIcon,
  LucideSettings2,
  MessageCircleIcon,
  Settings2Icon,
  SettingsIcon,
  UserPenIcon,
} from "lucide-react"; // 아이콘 모음 (알림, 메시지, 설정 등)

export default function Navigation({ 
  /*
    isLoggedIn: 로그인 상태 여부에 따라 우측 영역에 로그인/회원가입 또는 프로필 드롭다운을 표시
    hasNotifications: 읽지 않은 알림이 있으면 알림 아이콘에 빨간 점 뱃지를 표시
    hasMessages: 읽지 않은 메시지가 있으면 메시지 아이콘에 빨간 점 뱃지를 표시
  */
  isLoggedIn,
  hasNotifications,
  hasMessages,
 }: { 
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
}) {
  // 네비게이션 메뉴에 표시할 항목들을 정의한 배열
  // 각 항목은 이름(name), 경로(to), 하위 항목(items)을 가질 수 있음
  const menus: {
    name: string;
    to: string;
    items?: { name: string; to: string; description?: string }[];
  }[] = [
    {
      name: "Products",
      to: "/products",
      items: [
        {
          name: "Leaderboards",
          to: "/products/leaderboards",
          description: "showing the leader boards...",
        },
        {
          name: "Categories",
          to: "/products/categories",
          description: "showing categories of products...",
        },
        {
          name: "Search",
          to: "/products/search",
          description: "Find products and categories",
        },
        {
          name: "Submit a Product",
          to: "/products/submit",
          description: "Submit a new product !",
        },
        {
          name: "Promote a Product",
          to: "/products/promote",
          description: "Promote your product to reach more users",
        },
      ],
    },
    {
      name: "Jobs",
      to: "/jobs",
      items: [
        {
          name: "Remote Jobs",
          to: "/jobs?location=remote",
          description: "Browse remote job opportunities",
        },
        {
          name: "Full-Time Jobs",
          to: "/jobs?type=full-time",
          description: "Browse full-time job opportunities",
        },
        {
          name: "Freelance Jobs",
          to: "/jobs?type=freelance",
          description: "Browse freelance job opportunities",
        },
        {
          name: "Internships",
          to: "/jobs?type=internship",
          description: "Browse internship opportunities",
        },
        {
          name: "Submit a Job",
          to: "/jobs/submit",
          description: "Post a new job opportunity",
        },
      ],
    },
    {
      name: "Community",
      to: "/community",
      items: [
        {
          name: "All Posts",
          to: "/community",
          description: "Browse all community posts",
        },
        {
          name: "Top Posts",
          to: "/community?sort=top",
          description: "Browse top community posts",
        },
        {
          name: "New Posts",
          to: "/community?sort=new",
          description: "Browse the latest community posts",
        },
        {
          name: "Create a Post",
          to: "/community/create",
          description: "Post a new community discussion",
        },
      ],
    },
    {
      name: "IdeasGPT",
      to: "/ideas",
    },
    {
      name: "Teams",
      to: "/teams",
      items: [
        {
          name: "All Teams",
          description: "See all teams in our community",
          to: "/teams",
        },
        {
          name: "Create a Team",
          description: "Create a team in our community",
          to: "/teams/create",
        },
      ],
    },
  ];

  return (
    // 실제 네비게이션 UI를 렌더링하는 부분
    // 상단 고정 바 안에 로고와 메뉴 리스트를 표시함
    <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center">
        {/* wemake 로고 - 클릭 시 홈(/)으로 이동 */}
        <Link to="/" className="font-bold tracking-tighter text-lg">
          wemake
        </Link>
        {/* 로고와 메뉴 사이의 수직 구분선 */}
        <Separator orientation="vertical" className="h-6 mx-4" />
        <NavigationMenu>
          <NavigationMenuList>
            {/* 각 메뉴 항목을 반복 렌더링 */}
            {/* 하위 항목이 있으면 드롭다운 메뉴로, 없으면 일반 링크로 표시 */}
            {menus.map((menu) =>
              // 하위 메뉴가 있는 경우: 드롭다운 메뉴로 렌더링
              menu.items?.length ? (
                <NavigationMenuItem key={menu.name}>
                  <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {/* 드롭다운 메뉴 안의 항목 리스트 */}
                    <ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
                      {/* 하위 메뉴 항목들을 반복 렌더링 */}
                      {menu.items.map((item) => (
                        // NavigationMenuItem을 바로 <ul>의 자식으로 사용
                        <NavigationMenuItem
                          key={item.name}
                          className={cn([
                            // 강조 항목에만 배경 및 span 지정
                            "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
                            // 특정 경로에 대해 강조 스타일 적용
                            item.to === "/products/promote" &&
                              "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                            item.to === "/jobs/submit" &&
                              "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                          ])}
                        >
                          <NavigationMenuLink asChild>
                            <Link
                              className="p-3 space-y-1 block leading-none no-underline outline-none"
                              to={item.to}
                            >
                              {/* 메뉴 이름 */}
                              <span className="text-sm font-medium leading-none">
                                {item.name}
                              </span>
                              {/* 메뉴 설명 */}
                              <p className="text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                // 하위 메뉴가 없는 경우: 일반 링크로 렌더링
                <NavigationMenuItem key={menu.name}>
                  <Link to={menu.to} className={navigationMenuTriggerStyle()}> {/* 트리거와 동일한 스타일을 링크에 적용하는 헬퍼 */}
                    {menu.name}
                  </Link>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isLoggedIn ? ( // 로그인 상태: 알림/메시지/프로필 메뉴 표시
        <div className="flex items-center gap-2">
          {/* 알림 버튼 - 읽지 않은 알림이 있으면 빨간 점 표시 */}
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/notifications">
              <BellIcon className="size-4" />
              {/* 알림 뱃지(빨간 점) - 절대 위치로 아이콘 우상단에 표시 */}
              {hasNotifications && (
                <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>
          {/* 메시지 버튼 - 읽지 않은 메시지에 뱃지 표시 */}
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/messages">
            <MessageCircleIcon className="size-4" />
              {/* 메시지 뱃지(빨간 점) */}
              {hasMessages && (
                <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>
          {/* 프로필 드롭다운 - 아바타 클릭 시 열림 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild> {/* asChild: Trigger 자체 대신 자식(Avatar)을 트리거로 사용 */}
              <Avatar> {/* 프로필 이미지/이니셜 표시 */}
                <AvatarImage src="https://github.com/sorrynthx.png" /> {/* 프로필 이미지 URL */}
                <AvatarFallback>S</AvatarFallback> {/* 이미지가 없을 때 표시할 이니셜 */}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56"> {/* 드롭다운 내부 컨텐츠 래퍼 */}
              <DropdownMenuLabel className="flex flex-col"> {/* 사용자 이름/핸들 영역 */}
                <span className="font-medium">Sorrynthx</span>
                <span className="text-xs text-muted-foreground">@ㄲㄱ</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer"> {/* 대시보드로 이동 */}
                  <Link to="/my/dashboard">
                    <BarChart3Icon className="size-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer"> {/* 프로필 편집으로 이동 */}
                  <Link to="/my/profile">
                    <UserPenIcon className="size-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer"> {/* 설정 페이지로 이동 */}
                  <Link to="/my/settings">
                    <SettingsIcon className="size-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer"> {/* 로그아웃 */}
                  <Link to="/auth/logout">
                    <LogOutIcon className="size-4 mr-2" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : ( // 비로그인 상태: 로그인/회원가입 버튼 표시
        <div className="flex items-center gap-4">
          <Button asChild variant="secondary"> {/* Link를 버튼처럼 보이도록 렌더링(asChild) */}
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild> {/* 회원가입 버튼 */}
            <Link to="/auth/join">Join</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}

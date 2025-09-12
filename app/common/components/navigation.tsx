import { Link } from "react-router"; // 페이지 이동을 위한 링크 컴포넌트

// 아래는 UI에서 사용하는 네비게이션 메뉴 관련 컴포넌트들 (shadcn/Radix 래핑)
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
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
import { cn } from "~/lib/utils"; // 클래스명을 조건부로 합치는 유틸 함수
import { Button } from "./ui/button"; // 공통 버튼 컴포넌트 (asChild로 Link와 결합 가능)
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"; // 사용자 프로필 아바타
import {
  BarChart3Icon,
  BellIcon,
  LogOutIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserPenIcon,
} from "lucide-react"; // 아이콘 모음

export default function Navigation({
  /*
    isLoggedIn: 로그인 상태 여부에 따라 우측 영역에 로그인/회원가입 또는 프로필 드롭다운을 표시
    hasNotifications: 읽지 않은 알림이 있으면 알림 아이콘에 빨간 점 뱃지를 표시
    hasMessages: 읽지 않은 메시지가 있으면 메시지 아이콘에 빨간 점 뱃지를 표시
  */
  isLoggedIn,
  hasNotifications,
  hasMessages,
  username,
  avatar,
  name,
}: {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
  username?: string;
  avatar?: string | null;
  name?: string;
}) {
  // 네비게이션 메뉴 데이터 (이름/경로/설명)
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
          to: "/community/submit",
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
        { name: "All Teams", description: "See all teams in our community", to: "/teams" },
        { name: "Create a Team", description: "Create a team in our community", to: "/teams/create" },
      ],
    },
  ];

  return (
    // 실제 네비게이션 UI를 렌더링하는 부분 (상단 고정 바)
    <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center">
        {/* 로고 - 클릭 시 홈(/) 이동 */}
        <Link to="/" className="font-bold tracking-tighter text-lg">wemake</Link>
        {/* 로고와 메뉴 사이 구분선 */}
        <Separator orientation="vertical" className="h-6 mx-4" />

        {/* 상단 네비게이션 메뉴 래퍼 */}
        <NavigationMenu>
          <NavigationMenuList>
            {/* 각 상위 메뉴 렌더링 */}
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {menu.items?.length ? (
                  // 하위 메뉴가 있는 경우: Trigger로 드롭다운 열기 (절대 Link로 감싸지 않음)
                  <>
                    <Link to={menu.to}>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {/* 드롭다운 컨텐츠: 2열 그리드로 아이템 배치 */}
                        <ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
                          {menu.items.map((item) => (
                            <li
                              key={item.name}
                              className={cn([
                                "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
                                (item.to === "/products/promote" || item.to === "/jobs/submit") &&
                                  "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                              ])}
                            >
                              {/* 링크를 실제 인터랙티브 요소로 사용 (asChild로 단일 자식 보장) */}
                              <NavigationMenuLink asChild>
                                <Link 
                                  className="p-3 space-y-1 block leading-none no-underline outline-none" 
                                  to={item.to}
                                >
                                  {/* 메뉴 이름 */}
                                  <span className="text-sm font-medium leading-none">{item.name}</span>
                                  {/* 메뉴 설명 */}
                                  <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </Link>
                  </>
                ) : (
                  // 하위 메뉴가 없는 경우: 트리거 스타일을 적용한 일반 링크
                  <Link to={menu.to} className={navigationMenuTriggerStyle()}>{menu.name}</Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* 우측 사용자 영역 */}
      {isLoggedIn ? (
        // 로그인 상태: 알림/메시지/프로필 드롭다운
        <div className="flex items-center gap-2">
          {/* 알림 버튼 - asChild로 Link를 단일 자식으로 전달 */}
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/notifications" aria-label="Notifications">
              <BellIcon className="size-4" />
              {hasNotifications && (
                <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>

          {/* 메시지 버튼 */}
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/messages" aria-label="Messages">
              <MessageCircleIcon className="size-4" />
              {hasMessages && (
                <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>

          {/* 프로필 드롭다운 - Trigger에 asChild 사용, 단일 자식(Avatar) 전달 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Avatar>
              {avatar ? (
                <AvatarImage className="object-cover" src={avatar} />
              ) : (
                <AvatarFallback>{name?.[0]}</AvatarFallback>
              )}
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex flex-col">
              <span className="font-medium">{name}</span>
              <span className="text-xs text-muted-foreground">
                @{username}
              </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/dashboard">
                    <BarChart3Icon className="size-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/profile">
                    <UserPenIcon className="size-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="size-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/auth/logout">
                    <LogOutIcon className="size-4 mr-2" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        // 비로그인 상태: 로그인/회원가입 버튼
        <div className="flex items-center gap-4">
          <Button asChild variant="secondary">
            <Link to="/auth/login" aria-label="Login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/join" aria-label="Join">Join</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}

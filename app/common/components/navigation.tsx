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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";

import { Separator } from "~/common/components/ui/separator"; // 수직 구분선
import { cn } from "~/lib/utils";

export default function Navigation() {
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
          name: "Promte a Product",
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
          to: "/jobs?type=fulltime",
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
          name: "Tops Posts",
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
                  <Link to={menu.to} className={navigationMenuTriggerStyle()}>
                    {menu.name}
                  </Link>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}

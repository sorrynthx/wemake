import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

import Navigation from "~/common/components/navigation";
import { Settings } from "luxon";
import { cn } from "./lib/utils";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // luxon 설정
  Settings.defaultLocale = "ko";
  Settings.defaultZone = "Asia/Seoul";
  return (
    <html lang="en" className="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main>
          {children}
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // 현재 URL 경로(pathname)를 가져옴 → /auth 같은 경로 분기 처리에 사용
  const { pathname } = useLocation();  
  
  // react-router의 navigation 상태 훅 → 페이지 전환 상태를 알 수 있음
  const navigation = useNavigation();
  // 현재 페이지 전환 중인지 여부 확인 (loading 상태면 true)
  const isLoading = navigation.state === "loading";

  // 레이아웃 컨테이너: 경로와 로딩 상태에 따라 동적으로 클래스 부여
  return (
    <div
      className={cn({
        "py-28 px-5 md:px-20": !pathname.includes("/auth/"),
        "transition-opacity animate-pulse": isLoading,
      })}
    >
      {/* /auth 경로인 경우 네비게이션 숨김 */}
      {pathname.includes("/auth") ? "" : (
        <Navigation 
          isLoggedIn={true} 
          hasNotifications={true}
          hasMessages={true}
        />
      )}
      <Outlet />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

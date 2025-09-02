
/*
 * index: 해당 경로의 기본 페이지를 설정
 * prefix: 특정 경로 접두어(prefix)와 그 하위 라우트를 그룹으로 정의
 * route: 개별 경로와 해당 페이지 컴포넌트를 매핑
 */
import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

// 라우트 설정 파일 - 각 경로와 해당 페이지 컴포넌트를 정의
export default [
    // 1.메인 홈 페이지
    index("common/pages/home-page.tsx"),
    // 2.상품 관련 페이지 라우트
    ...prefix("products", [
        // 상품 리스트 페이지
        index("features/products/pages/products-page.tsx"),
        // 상품 리더보드 관련 페이지 라우트
        layout("features/products/layouts/leaderboard-layout.tsx", [
            ...prefix("leaderboards", [
                index("features/products/pages/leaderboard-page.tsx"),
                route(
                    "/yearly/:year",
                    "features/products/pages/yearly-leaderboard-page.tsx"
                ),
                route(
                    "/monthly/:year/:month",
                    "features/products/pages/monthly-leaderboard-page.tsx"
                ),
                route(
                    "/daily/:year/:month/:day",
                    "features/products/pages/daily-leaderboard-page.tsx"
                ),
                route(
                    "/weekly/:year/:week",
                    "features/products/pages/weekly-leaderboard-page.tsx"
                ),
                route(
                    "/:period",
                    "features/products/pages/leaderboards-redirection-page.tsx"
                ),
            ]),
        ]),
        // 상품 카테고리 관련 페이지 라우트
        ...prefix("categories", [
            // 전체 카테고리 페이지
            index("features/products/pages/categories-page.tsx"),
            // 특정 카테고리 상세 페이지
            route("/:category", "features/products/pages/category-page.tsx"),
        ]),
        // 상품 검색 페이지
        route("/search", "features/products/pages/search-page.tsx"),
        // 상품 제출 페이지
        route("/submit", "features/products/pages/submit-product-page.tsx"),
        // 상품 홍보 페이지
        route("/promote", "features/products/pages/promote-page.tsx"),
        // 상품 상세 페이지 (레이아웃 적용)
        ...prefix("/:productId", [
            layout("features/products/layouts/product-overview-layout.tsx", [
                index("features/products/pages/product-redirect-page.tsx"),
                route("/overview", "features/products/pages/product-overview-page.tsx"),
                ...prefix("/reviews", [
                    index("features/products/pages/product-reviews-page.tsx"),
                ])
            ]),
        ]),

    ]),
    // 3.GPTIdae
    ...prefix("/ideas", [
        index("features/ideas/pages/ideas-page.tsx"),
        route("/:ideaId", "features/ideas/pages/idea-page.tsx"),
    ]),
    // 4.Jobs
    ...prefix("/jobs", [
        index("features/jobs/pages/jobs-page.tsx"),
        route("/:jobId", "features/jobs/pages/job-page.tsx"),
        route("/submit", "features/jobs/pages/submit-job-page.tsx"),
    ]),
    // 5.Auth (login, join, otp, social )
    ...prefix("/auth", [
        layout("features/auth/layouts/auth-layout.tsx", [
            route("/login", "features/auth/pages/login-page.tsx"),
            route("/join", "features/auth/pages/join-page.tsx"),
            ...prefix("/otp", [
                route("/start", "features/auth/pages/otp-start-page.tsx"),
                route("/complete", "features/auth/pages/otp-complete-page.tsx"),
            ]),
            ...prefix("/social/:provider", [
                route("/start", "features/auth/pages/social-start-page.tsx"),
                route("/complete", "features/auth/pages/social-complete-page.tsx"),
            ]),
        ]),
    ]),
    // 6.Community
    ...prefix("/community", [
        index("features/community/pages/community-page.tsx"),
        route("/:postId", "features/community/pages/post-page.tsx"),
        route("/submit", "features/community/pages/submit-post-page.tsx"),
    ]),
    // 7.Teams
    ...prefix("/teams", [
        index("features/teams/pages/teams-page.tsx"),
        route("/:teamId", "features/teams/pages/team-page.tsx"),
        route("/create", "features/teams/pages/submit-team-page.tsx"),
    ]),
    // 8. Users-Private
    ...prefix("/my", [
        // Dashboard
        layout("features/users/layouts/dashboard-layout.tsx", [
            ...prefix("/dashboard", [
                index("features/users/pages/dashboard-page.tsx"),
                route("/ideas", "features/users/pages/dashboard-ideas-page.tsx"),
                route(
                    "/products/:productId",
                    "features/users/pages/dashboard-product-page.tsx"
                ),
            ])
        ]),
        // Messages
        layout("features/users/layouts/messages-layout.tsx", [
            ...prefix("/messages", [
                index("features/users/pages/messages-page.tsx"),
                route("/:messageId", "features/users/pages/message-page.tsx"),
            ]),
        ]),
        // Profile Private
        route("/profile", "features/users/pages/my-profile-page.tsx"),
        // Settings
        route("/settings", "features/users/pages/settings-page.tsx"),
        // Notifications
        route("/notifications", "features/users/pages/notifications-page.tsx"),
    ]),
    // 9. Users-Public
    layout("features/users/layouts/profile-layout.tsx", [
        ...prefix("/users/:username", [
            index("features/users/pages/profile-page.tsx"),
            route("/products", "features/users/pages/profile-products-page.tsx"),
            route("/posts", "features/users/pages/profile-posts-page.tsx"),
        ]),
    ]),

] satisfies RouteConfig;

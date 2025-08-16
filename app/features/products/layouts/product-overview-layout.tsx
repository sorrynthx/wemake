
import { Button, buttonVariants } from "~/common/components/ui/button";
import { ChevronUpIcon, StarIcon } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import type { Route } from "./+types/product-overview-layout";
import { cn } from "~/lib/utils";

/**
 * 제품 상세 페이지의 레이아웃 컴포넌트
 * 
 * 이 레이아웃은 다음과 같은 구조로 작동합니다:
 * 1. 상단: 제품 헤더 (아이콘, 이름, 설명, 평점, 버튼들)
 * 2. 중간: 네비게이션 탭 (Overview, Reviews)
 * 3. 하단: <Outlet /> - 하위 라우트의 내용이 여기에 렌더링됨
 * 
 * 라우트 구조:
 * /products/:productId/overview → Overview 탭 내용
 * /products/:productId/reviews → Reviews 탭 내용
 * /products/:productId/reviews/new → 새 리뷰 작성 페이지
 */
export default function ProductOverviewLayout({ params }: Route.ComponentProps) {
    const productId = params.productId;
    return (
        <div className="space-y-10">
            {/* 제품 헤더 섹션 */}
            <div className="flex justify-between">
                {/* 왼쪽: 제품 정보 */}
                <div className="flex gap-10">
                    {/* 제품 아이콘/이미지 */}
                    <div className="size-40 rounded-xl shadow-lg bg-primary/50"></div>

                    <div>
                        {/* 제품명과 설명 */}
                        <h1 className="text-5xl font-bold">Product Name</h1>
                        <p className="text-2xl font-light">Product description</p>
                        {/* 평점 표시 */}
                        <div className="mt-5 flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <StarIcon className="size-4" fill="currentColor" />
                                ))}
                            </div>
                            {/* 리뷰 개수 */}
                            <span className="text-muted-foreground">100 reviews</span>
                        </div>
                    </div>
                </div>
                {/* 오른쪽: 액션 버튼들 */}
                <div className="flex gap-5">
                    <Button variant="secondary" size="lg" className="text-lg h-14 px-10">
                        Visit Website
                    </Button>
                    <Button size="lg" className="text-lg h-14 px-10">
                        <ChevronUpIcon className="size-4" />
                        Upvote (100)
                    </Button>
                </div>
            </div>

            {/* 네비게이션 탭 섹션 */}
            <div className="flex gap-2.5">
                {/* Overview 탭 - /products/:productId/overview 경로로 이동 */}
                <NavLink className={({ isActive }) =>
                    cn(
                        buttonVariants({ variant: "outline" }),
                        isActive && "bg-accent text-foreground"

                    )
                } to={`/products/${productId}/overview`}>
                    Overview
                </NavLink>

                {/* Reviews 탭 - /products/:productId/reviews 경로로 이동 */}
                <NavLink className={({ isActive }) =>
                    cn(
                        buttonVariants({ variant: "outline" }),
                        isActive && "bg-accent text-foreground"

                    )
                } to={`/products/${productId}/reviews`}>
                    Reviews
                </NavLink>
            </div>

            {/* 
                Outlet 컴포넌트 - 하위 라우트의 내용이 여기에 렌더링됩니다
                
                현재 URL에 따라 다음 중 하나가 표시됩니다:
                - /overview → ProductOverviewPage 컴포넌트
                - /reviews → ProductReviewsPage 컴포넌트  
                - /reviews/new → NewProductReviewPage 컴포넌트
                
                이 레이아웃은 상단 헤더와 네비게이션을 고정하고,
                하단 내용만 라우트에 따라 동적으로 변경됩니다.
            */}
            <div>
                <Outlet />
            </div>
        </div>

    )

}
// 아이콘 컴포넌트 import
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from "lucide-react";
// 라우팅을 위한 Link 컴포넌트 import
import { Link } from "react-router";
// UI Button 컴포넌트 import
import { Button } from "~/common/components/ui/button";
// 카드 UI 관련 컴포넌트 import
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";

// ProductCard 컴포넌트의 props 타입 정의
interface ProductCardProps {
  // 상품의 고유 아이디
  productId: string;
  // 상품명
  name: string;
  // 상품 설명
  description: string;
  // 댓글 수
  commentCount: number;
  // 조회수
  viewCount: number;
  // 업보트(추천) 수
  upvoteCount: number;
}

// 상품 정보를 보여주는 카드 컴포넌트
export function ProductCard({
  productId,
  name,
  description,
  commentCount,
  viewCount,
  upvoteCount,
}: ProductCardProps) {
  return (
    // 상품 상세 페이지로 이동하는 링크
    <Link to={`/products/${productId}`} className="block">
      {/* 카드 전체 레이아웃 */}
      <Card className="w-full flex items-center justify-between bg-transparent hover:bg-card/50">
        {/* 카드 헤더: 상품명, 설명, 댓글/조회수 표시 */}
        <CardHeader>
          {/* 상품명 표시 */}
          <CardTitle className="text-2xl font-semibold leading-none tracking-tight">{name}</CardTitle>
          {/* 상품 설명 표시 */}
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
          {/* 댓글 수와 조회수 표시 영역 */}
          <div className="flex items-center gap-4 mt-2">
            {/* 댓글 수 표시 */}
            <div className="flex items-center gap-px text-xs text-muted-foreground">
              {/* 댓글 아이콘 */}
              <MessageCircleIcon className="w-4 h-4" />
              {/* 댓글 개수 */}
              <span>{commentCount}</span>
            </div>
            {/* 조회수 표시 */}
            <div className="flex items-center gap-px text-xs text-muted-foreground">
              {/* 조회수 아이콘 */}
              <EyeIcon className="w-4 h-4" />
              {/* 조회수 */}
              <span>{viewCount}</span>
            </div>
          </div>
        </CardHeader>
        {/* 카드 푸터: 업보트 버튼 */}
        <CardFooter className="py-0">
          {/* 업보트(추천) 버튼 */}
          <Button variant="outline" className="flex flex-col h-14">
            {/* 업보트 아이콘 */}
            <ChevronUpIcon className="size-4 shrink-0" />
            {/* 업보트(추천) 수 */}
            <span>{upvoteCount}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

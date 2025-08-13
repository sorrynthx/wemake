// 이 컴포넌트는 커뮤니티 게시글 카드를 렌더링하는 역할을 합니다.

import { DotIcon } from "lucide-react";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "~/common/components/ui/card";

// PostCard 컴포넌트가 필요로 하는 props의 타입을 정의합니다.
interface PostCardProps {
  postId: string;
  title: string;
  author: string;
  authorAvatarUrl?: string;
  category: string;
  timeAgo: string;
}

// 게시글 정보를 받아서 커뮤니티 게시글 카드를 렌더링하는 함수형 컴포넌트입니다.
export function PostCard({ postId, title, author, authorAvatarUrl, category, timeAgo }: PostCardProps) {
  // 작성자 이름에서 각 단어의 첫 글자를 뽑아 이니셜을 생성합니다.
  const initials = author.split(' ').map(word => word[0]).join('').toUpperCase();
  
  return (
    // 게시글 상세 페이지로 이동할 수 있도록 카드 전체를 Link 컴포넌트로 감쌉니다.
    <Link to={`/community/${postId}`}>
      {/* 게시글 카드의 기본 레이아웃과 스타일을 담당하는 Card 컴포넌트입니다. */}
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        {/* 카드 상단 헤더 영역으로, 아바타와 제목 및 메타 정보를 포함합니다. */}
        <CardHeader className="flex flex-row items-center gap-2">
          {/* 작성자의 아바타를 표시하는 컴포넌트입니다. */}
          <Avatar className="size-14">
            {/* 아바타 이미지가 없을 경우 표시할 작성자 이니셜 */}
            <AvatarFallback>{initials}</AvatarFallback>
            {/* 작성자 아바타 이미지 */}
            <AvatarImage src={authorAvatarUrl} />
          </Avatar>
          <div className="space-y-2">
            {/* 게시글 제목 */}
            <CardTitle>{title}</CardTitle>
            {/* 작성자 이름, 카테고리, 작성 시간 등의 메타 정보를 표시합니다. */}
            <div className="flex gap-2 text-sm leading-tight text-muted-foreground">
              <span>{author} on</span>
              <span>{category}</span>
              <DotIcon className="w-4 h-4" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </CardHeader>
        {/* 카드 하단 영역으로, 답글 버튼이 포함되어 있습니다. */}
        <CardFooter className="flex justify-end">
          {/* 답글 버튼이며, 클릭 시 동일한 게시글 상세 페이지로 이동합니다. */}
          <Button variant="link">Reply &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

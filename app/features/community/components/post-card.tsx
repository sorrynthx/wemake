// 커뮤니티 게시글의 제목, 작성자, 카테고리, 시간, 투표수 등을 보여주는 카드 UI 컴포넌트

import { ChevronUpIcon, DotIcon } from "lucide-react";
import { DateTime } from "luxon";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "~/common/components/ui/card";
import { cn } from "~/lib/utils";

// PostCard 컴포넌트에 전달되는 게시글 데이터의 타입 정의
interface PostCardProps {
  id: string;
  title: string;
  author: string;
  authorAvatarUrl: string | null;
  category: string;
  postedAt: string;
  expanded?: boolean;
  votesCount?: number;
}

// 게시글 데이터를 받아 카드 형태로 화면에 렌더링하는 컴포넌트
export function PostCard({ id, title, author, authorAvatarUrl, category, postedAt, expanded = false, votesCount = 0, }: PostCardProps) {
  // 작성자 이름의 각 단어 첫 글자를 추출해 대문자로 변환한 이니셜 생성
  const initials = author.split(' ').map(word => word[0]).join('').toUpperCase();

  return (
    // 카드 전체를 클릭 시 해당 게시글 상세 페이지로 이동하도록 Link로 감쌈
    <Link to={`/community/${id}`} className="block">
      {/* 카드 UI의 전체 레이아웃과 hover 시 배경 전환 스타일 적용 */}
      <Card className={cn(
        "bg-transparent hover:bg-card/50 transition-colors",
        expanded ? "flex flex-row items-center justify-between" : ""
      )}>
        {/* 카드 상단: 작성자 아바타, 제목, 메타정보 영역 */}
        <CardHeader className="flex flex-row items-center gap-2">
          {/* 작성자 프로필 이미지를 표시 (없으면 이니셜 표시) */}
          <Avatar className="size-14">
            {/* 아바타 이미지가 없을 경우 표시할 작성자 이니셜 */}
            <AvatarFallback>{initials}</AvatarFallback>
            {/* 작성자 아바타 이미지 */}
            {authorAvatarUrl && <AvatarImage src={authorAvatarUrl} />}
          </Avatar>
          <div className="space-y-2">
            {/* 게시글 제목 */}
            <CardTitle>{title}</CardTitle>
            {/* 작성자 이름, 카테고리, 작성 시간 등의 메타 정보를 표시합니다. */}
            <div className="flex gap-2 text-sm leading-tight text-muted-foreground">
              <span>{author} on</span>
              <span>{category}</span>
              <DotIcon className="w-4 h-4" />
              <span>{DateTime.fromISO(postedAt).toRelative()}</span>
            </div>
          </div>
        </CardHeader>

        {/* 카드 하단: 축소 모드에서는 Reply 버튼 표시 */}
        {!expanded && (
          <CardFooter className="flex justify-end">
            <Button variant="link">Reply &rarr;</Button>
          </CardFooter>
        )}
        {/* 카드 하단: 확장 모드에서는 투표 버튼과 카운트 표시 */}
        {expanded && (
          <CardFooter className="flex justify-end  pb-0">
            <Button variant="outline" className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>{votesCount}</span>
            </Button>
          </CardFooter>
        )}

      </Card>
    </Link>
  );
}

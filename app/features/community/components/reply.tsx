// import 구역: 필요한 라이브러리와 UI 컴포넌트들을 불러옵니다.
import { Form, Link } from "react-router";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";

// interface: Reply 컴포넌트가 받는 props의 타입을 정의합니다.
interface ReplyProps {
  username: string; // 유저 이름
  avatarUrl: string; // 유저 아바타 이미지 URL
  content: string; // 댓글 내용
  timestamp: string; // 작성 시간
  topLevel: boolean; // 최상위 댓글 여부 (대댓글 렌더링 조건)
}

// Reply 컴포넌트: 댓글을 렌더링하며, 대댓글 작성 상태를 관리합니다.
// props로 유저 정보, 댓글 내용, 작성 시간, 최상위 댓글 여부를 받습니다.
export function Reply({
  username,
  avatarUrl,
  content,
  timestamp,
  topLevel,
}: ReplyProps) {
  // replying state: 대댓글 작성 폼의 표시 여부를 관리합니다.
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);

  return (
    <div className="flex flex-col gap-2">
      {/* 아바타와 유저 정보, 댓글 내용, 답글 버튼 부분 */}
      <div className="flex items-start gap-5 w-2/3">
        <Avatar className="size-14">
          <AvatarFallback>{username[0]}</AvatarFallback>
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <div className="flex flex-col gap-2 items-start">
          {/* 유저 이름과 작성 시간, 구분 점 */}
          <div className="flex gap-2 items-center">
            <Link to={`/users/${username}`}>
              <h4 className="font-medium">{username}</h4>
            </Link>
            <DotIcon className="size-5" />
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          {/* 댓글 본문 */}
          <p className="text-muted-foreground">{content}</p>
          {/* 답글 작성 토글 버튼 */}
          <Button variant="ghost" className="self-end" onClick={toggleReplying}>
            <MessageCircleIcon className="size-4" />
            Reply
          </Button>
        </div>
      </div>

      {/* 대댓글 작성 폼: replying 상태일 때만 렌더링 */}
      {replying && (
        <Form className="flex items-start gap-5 w-3/4">
          <Avatar className="size-14">
            <AvatarFallback>S</AvatarFallback>
            <AvatarImage src="https://github.com/sorrynthx.png" />
          </Avatar>
          <div className="flex flex-col gap-5 items-end w-full">
            <Textarea
              placeholder="Write a reply"
              className="w-full resize-none"
              rows={5}
            />
            <Button>Reply</Button>
          </div>
        </Form>
      )}

      {/* 최상위 댓글일 경우 대댓글 컴포넌트를 재귀적으로 렌더링 */}
      {topLevel && (
        <div className="pl-20 w-full">
          <Reply
            username="Nicolas"
            avatarUrl="https://github.com/apple.png"
            content="I've been using Todoist for a while now, and it's really great. It's simple, easy to use, and has a lot of features."
            timestamp="12 hours ago"
            topLevel={false}
          />
        </div>
      )}
    </div>
  );
}
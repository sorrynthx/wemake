// MessageBubble 컴포넌트
// 이 파일은 개별 채팅 메시지를 말풍선 형태로 표시한다.
// 아바타(프로필 이미지), 메시지 내용, 보낸 사람이 현재 사용자 여부에 따라 정렬/스타일이 달라진다.
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "~/common/components/ui/avatar";
  import { cn } from "~/lib/utils";
  
// MessageBubble 컴포넌트가 받는 props 타입 정의
// - avatarUrl: 아바타 이미지 경로
// - avatarFallback: 이미지 로딩 실패 시 대체 텍스트
// - content: 메시지 텍스트 내용
// - isCurrentUser: 현재 사용자가 보낸 메시지 여부 (true/false)
  interface MessageBubbleProps {
    avatarUrl: string;
    avatarFallback: string;
    content: string;
    isCurrentUser?: boolean;
  }
  
// MessageBubble 컴포넌트 정의
// isCurrentUser 값에 따라 flex 정렬 방향과 말풍선 색상/모서리 스타일이 달라진다.
  export function MessageBubble({
    avatarUrl,
    avatarFallback,
    content,
    isCurrentUser = false,
  }: MessageBubbleProps) {
    return (
      <>
        {/* 전체 래퍼: flex 정렬, gap-4 적용
            - isCurrentUser 가 true 면 flex-row-reverse 로 아바타와 말풍선 위치 반전 */}
        <div
          className={cn(
            "flex items-end gap-4",
            isCurrentUser ? "flex-row-reverse" : ""
          )}
        >
          {/* 아바타 영역: 프로필 이미지 또는 대체 텍스트 표시 */}
          <Avatar>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          {/* 메시지 말풍선 영역
              - 항상 공통 스타일: 둥근 모서리, 패딩, 텍스트 크기, 고정 너비 1/4
              - isCurrentUser 가 true 인 경우: 배경색 accent, 오른쪽 아래 모서리 제거
              - false 인 경우: 배경색 primary, 글자색 반전, 왼쪽 아래 모서리 제거 */}
          <div
            className={cn({
              "rounded-md p-4 text-sm w-1/4": true,
              "bg-accent rounded-br-none": isCurrentUser,
              "bg-primary text-primary-foreground rounded-bl-none": !isCurrentUser,
            })}
          >
            <p>{content}</p>
          </div>
        </div>
      </>
    );
  }
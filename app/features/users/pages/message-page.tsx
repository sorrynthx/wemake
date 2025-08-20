// MessagePage 컴포넌트
// 이 파일은 선택된 대화방의 채팅 화면을 정의한다.
// 상단에는 대화 상대 정보 카드, 중앙에는 메시지 리스트, 하단에는 메시지 입력창을 배치한다.

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "~/common/components/ui/card";
  
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "~/common/components/ui/avatar";
  import { Form } from "react-router";
  import { Textarea } from "~/common/components/ui/textarea";
  import { Button } from "~/common/components/ui/button";
  import { SendIcon } from "lucide-react";
  import { MessageBubble } from "../components/message-bubble";
import type { Route } from "./+types/message-page";
  
  // 페이지 메타데이터 설정 (브라우저 탭 제목 등)
  export const meta: Route.MetaFunction = () => {
    return [{ title: "Message | wemake" }];
  };
  
  // 메시지 페이지 컴포넌트 정의
  export default function MessagePage() {
    return (
      <>
      {/* 전체 레이아웃 컨테이너: 세로 방향 flex 레이아웃으로 구성, 상단/중앙/하단 영역을 포함 */}
      <div className="flex flex-col min-h-0 flex-1">
        {/* 상단 헤더 카드: 대화 상대의 프로필(아바타, 이름, 최근 활동 시간)을 표시 */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="size-14">
              <AvatarImage src="https://github.com/nvidia.png" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <CardTitle className="text-xl">Steve Jobs</CardTitle>
              <CardDescription>2 days ago</CardDescription>
            </div>
          </CardHeader>
        </Card>
        {/* 메시지 리스트 영역: overflow-y-scroll 로 스크롤 가능, MessageBubble 컴포넌트를 반복 렌더링
            현재는 더미 데이터 10개를 생성하여 테스트용 메시지를 출력 */}
        <div className="py-10 overflow-y-scroll flex flex-col justify-start h-full">
          {Array.from({ length: 10 }).map((_, index) => (
            <MessageBubble
              key={index}
              avatarUrl="https://github.com/apple.png"
              avatarFallback="A"
              content="this is a message from steve jobs in iheaven, make sure to reply because if you don't, you will be punished."
              isCurrentUser={index % 2 === 0}
            />
          ))}
        </div>
        {/* 하단 입력 카드: 메시지를 작성하고 전송하는 입력 영역
            Textarea 와 전송 버튼을 포함 */}
        <Card>
          <CardHeader>
            <Form className="relative flex justify-end items-center">
              <Textarea
                placeholder="Write a message..."
                rows={2}
                className="resize-none"
              />
              <Button type="submit" size="icon" className="absolute right-2">
                <SendIcon className="size-4" />
              </Button>
            </Form>
          </CardHeader>
        </Card>
      </div>
      </>
    );
  }
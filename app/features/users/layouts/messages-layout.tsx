// MessagesLayout 컴포넌트
// 이 파일은 사용자 메시지 페이지 전체 레이아웃을 정의한다.
// 좌측에는 대화방 리스트(Sidebar), 우측에는 현재 선택된 대화 내용을 표시하는 Outlet 구조로 되어 있다.
import { Outlet } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from "~/common/components/ui/sidebar";
import MessageRoomCard from "../components/message-room-card";

// 메시지 레이아웃 컴포넌트 정의
export default function MessagesLayout() {
  return (
    // SidebarProvider : 사이드바와 본문 레이아웃을 감싸는 컨테이너
    // 화면 전체 높이를 기준으로 (calc(100vh - 14rem)) 영역을 차지하며 내부 스크롤 가능
    <SidebarProvider className="flex h-[calc(100vh-14rem)] max-h-[calc(100vh-14rem)] min-h-0 overflow-hidden">
      {/* 
        Sidebar : 좌측 대화방 목록을 표시하는 영역
        shrink-0 으로 설정하여 크기가 줄어들지 않도록 고정
      */}
      <Sidebar className="pt-16 shrink-0" variant="floating">
        {/* 
          SidebarContent : 실제 사이드바 내부 컨텐츠 영역
        */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {/*
                대화방 리스트를 20개 생성하여 MessageRoomCard 컴포넌트로 렌더링
                실제 데이터 연동 시 이 부분을 API 결과로 교체하면 됨
              */}
              {Array.from({ length: 20 }).map((_, index) => (
                <MessageRoomCard
                  key={index}
                  id={index.toString()}
                  name={`User ${index}`}
                  lastMessage={`Last message ${index}`}
                  avatarUrl={`https://github.com/sorrynthx.png`}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {/*
        오른쪽 본문 영역 : 현재 선택된 대화방의 채팅 내용을 표시
        react-router 의 Outlet 을 사용하여 자식 라우트가 이 영역에 렌더링됨
      */}
      <div className="flex-1 min-h-0 flex flex-col">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
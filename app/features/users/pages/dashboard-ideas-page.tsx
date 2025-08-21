import type { Route } from "./+types/dashboard-ideas-page";

// 아이디어 카드 컴포넌트를 불러옵니다. 이 컴포넌트는 각 아이디어를 카드 형식으로 보여줍니다.
import { IdeaCard } from "~/features/ideas/components/idea-card";

// 페이지 메타 정보를 설정하는 함수입니다. 여기서는 브라우저 탭에 표시될 제목을 지정합니다.
export const meta: Route.MetaFunction = () => {
  return [{ title: "My Ideas | wemake" }];
};

// 대시보드 내 아이디어 목록을 보여주는 페이지 컴포넌트입니다.
export default function DashboardIdeasPage() {
  return (
    // 전체 페이지 레이아웃을 담당하는 div로, 세로 방향 간격과 높이 설정을 합니다.
    <div className="space-y-5 h-full">
      {/* 페이지 제목을 나타내는 헤더입니다. */}
      <h1 className="text-2xl font-semibold mb-6">Claimed Ideas</h1>
      {/* 아이디어 카드를 4열 그리드 형태로 배치하는 컨테이너입니다. */}
      <div className="grid grid-cols-4 gap-6">
        {/* 
          Array.from을 사용해 길이가 5인 배열을 만들고, 
          map을 통해 각 인덱스에 해당하는 아이디어 카드를 렌더링합니다. 
          이는 예시 데이터를 기반으로 한 더미 아이디어 카드 생성 방식입니다.
        */}
        {Array.from({ length: 5 }).map((_, index) => (
          // 각 아이디어 카드를 렌더링하며, 고유 key와 아이디어 ID를 인덱스를 기반으로 지정합니다.
          <IdeaCard
            key={`ideaId-${index}`}
            ideaId={`ideaId-${index}`}
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
            views={123}
            timeAgo="12 hours ago"
            likes={12}
          />
        ))}
      </div>
    </div>
  );
}
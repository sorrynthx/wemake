import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components/idea-card";
import { HeroSection } from "~/common/components/hero-section";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Ideas | wemake" },
    { name: "description", content: "Discover and explore innovative ideas from the community" }
  ];
}

export function loader() {
  // Mock data for demonstration - in real app, this would come from database
  const ideas = [
    {
      ideaId: "1",
      title: "AI-Powered Task Management App A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business.",
      views: 1247,
      timeAgo: "2 hours ago",
      likes: 89,
      claimed: false
    },
    {
      ideaId: "2", 
      title: "Sustainable Food Delivery Platform A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business." ,
      views: 892,
      timeAgo: "1 day ago",
      likes: 156,
      claimed: true
    },
    {
      ideaId: "3",
      title: "Virtual Reality Learning Environment A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business.",
      views: 2156,
      timeAgo: "3 days ago", 
      likes: 234,
      claimed: false
    },
    {
      ideaId: "4",
      title: "Smart Home Energy Management System A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business.",
      views: 678,
      timeAgo: "1 week ago",
      likes: 67,
      claimed: false
    },
    {
      ideaId: "5",
      title: "Community-Based Skill Sharing Platform A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business.",
      views: 1432,
      timeAgo: "2 weeks ago",
      likes: 198,
      claimed: true
    }
  ];

  return { ideas };
}

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  const { ideas } = loaderData;

  return (
    <div className="space-y-20">
      {/* 페이지 헤더 */}
      <HeroSection title="IdeasGPT" subtitle="Find ideas for your next project" />

      {/* 아이디어 목록 */}
      <div className="grid grid-cols-4 gap-4">
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.ideaId}
            ideaId={idea.ideaId}
            title={idea.title}
            views={idea.views}
            timeAgo={idea.timeAgo}
            likes={idea.likes}
            claimed={idea.claimed}
          />
        ))}
      </div>

      {/* 빈 상태 (아이디어가 없을 때) */}
      {ideas.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <p className="text-lg">No ideas yet</p>
            <p className="text-sm">Be the first to share an innovative idea!</p>
          </div>
        </div>
      )}
    </div>
  );
}

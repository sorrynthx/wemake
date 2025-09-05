import { DotIcon, HeartIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { HeroSection } from "~/common/components/hero-section";
import { Button } from "~/common/components/ui/button";
import { getGptIdea } from "../queries";
import { DateTime } from "luxon";
import type { Route } from "./+types/idea-page";

// 메타 함수에서 data가 undefined일 수 있으므로 안전하게 구조 분해 할당을 처리합니다.
// idea 객체가 없을 경우 기본값을 사용하여 에러를 방지합니다.
export const meta = ({
  data,
}: Route.MetaArgs) => {
  // idea가 존재하지 않을 경우를 대비하여 기본값을 설정합니다.
  const gptIdeaId = data?.idea?.gpt_idea_id ?? "";
  const ideaText = data?.idea?.idea ?? "";
  return [
    { title: `Idea #${gptIdeaId}: ${ideaText} | wemake` },
    { name: "description", content: "Find ideas for your next project" },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const idea = await getGptIdea(params.ideaId);
  return { idea };
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="">
      <HeroSection title={`Idea #${loaderData.idea.gpt_idea_id}`} />
      <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
        <p className="italic text-center">"{loaderData.idea.idea}"</p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            <span>{loaderData.idea.views}</span>
          </div>
          <DotIcon className="w-4 h-4" />
          <span>
            {DateTime.fromISO(loaderData.idea.created_at).toRelative()}
          </span>
          <DotIcon className="w-4 h-4" />
          <Button variant="outline">
            <HeartIcon className="w-4 h-4" />
            <span>{loaderData.idea.likes}</span>
          </Button>
        </div>
        <Button size="lg">Claim idea now &rarr;</Button>
      </div>
    </div>
  );
}
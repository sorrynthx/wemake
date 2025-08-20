
import { HeroSection } from "~/common/components/hero-section";
import { TeamCard } from "../components/team-card";
import type { Route } from "./+types/teams-page";

export const meta: Route.MetaFunction = () => [{ title: "Teams | wemake" }];

export default function TeamsPage() {
  return (
    <div className="space-y-20">
      <HeroSection title="Teams" subtitle="Find a team looking for a new member." />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <TeamCard
            key={`teamId-${index}`}
            teamId={`teamId-${index}`}
            leaderUsername="sorrynthx"
            leaderAvatarUrl="https://github.com/sorrynthx.png"
            leaderAvatarFallback={"S"}
            positions={[
                "React Developer",
                "Backend Developer",
                "Product Manager",
            ]}
            projectDescription="a new social media platform"  />
        ))}
      </div>
    </div>
  );
}
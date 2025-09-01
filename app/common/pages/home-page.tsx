import { Link, type MetaFunction } from "react-router";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import { TeamCard } from "~/features/teams/components/team-card";
import type { Route } from "./+types/home-page";
import { getProductsByDateRange } from "~/features/products/querues";
import { DateTime } from "luxon";

export const meta: MetaFunction = () => {
  return [
    { title: "Home 🐳 | wemake" },
    { name: "description", content: "Welcome to wemake" }
  ];
};

/*
 * loader 함수:
 * - 페이지가 렌더링되기 전에 서버 또는 클라이언트에서 필요한 데이터를 불러오는 함수
 * - 반환한 데이터는 해당 페이지 컴포넌트의 props로 전달되어 사용됨
 */
export const loader = async () => {
  const products = await getProductsByDateRange({
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    limit: 7,
  });
  return { products };
  
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-40">
      {/* Products */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Today's Products</h2>
          <p className="text-xl font-light text-foreground">The best products made by our community today.</p>
          <Button variant="link" className="text-lg p-0" asChild>
            <Link to="/products/leaderboards">Explore all products &rarr;</Link>
          </Button>
        </div>
 
          {loaderData.products.map((product, index) => (
            <ProductCard
              key={product.product_id}
              id={product.product_id.toString()}
              name={product.name}
              description={product.description}
              reviewsCount={product.reviews}
              viewsCount={product.views}
              votesCount={product.upvotes}
            />
          ))}
        
      </div>

      {/* Discussions */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Latest discussions</h2>
          <p className="text-xl font-light text-foreground">The latest discussions from our community today.</p>
          <Button variant="link" className="text-lg p-0" asChild>
            <Link to="/community">Explore all discussions &rarr;</Link>
          </Button>
        </div>

        {Array.from({ length: 5 }, (_, index) => (
          <PostCard
            key={index}
            id={`post-${index + 1}`}
            title={`Waht is the best productivity tool? ${index + 1}`}
            author={`User ${index + 1}`}
            authorAvatarUrl={`https://github.com/user${index + 1}.png`}
            category={["Productivity", "Design", "Development", "Marketing", "Business"][index]}
            postedAt={`${index + 1} hours ago`}
          />
        ))}
      </div>

      {/* IdeaGPT */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">IdeasGPT</h2>
          <p className="text-xl font-light text-foreground">Find ideas for your next project.</p>
          <Button variant="link" className="text-lg p-0" asChild>
            <Link to="/ideas">Explore all ideas &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 5 }, (_, index) => (
          <IdeaCard
            key={index}
            ideaId={`idea-${index + 1}`}
            title={`This is Idea Card ${index + 1}. If you find some good idea in here ? then purchase it. So nobody see this idea. You can own this idea and make money! money! money! The only way to be rich, Just do it if you find good idea on Internet or your life.`}
            views={Math.floor(Math.random() * 200) + 50}
            timeAgo={`${index + 1} hours ago`}
            likes={Math.floor(Math.random() * 50) + 10}
            claimed={index % 2 === 0}
          />
        ))}
      </div>

      {/* Jobs */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Latest Jobs</h2>
          <p className="text-xl font-light text-foreground">Find your dream Job!!</p>
          <Button variant="link" className="text-lg p-0" asChild>
            <Link to="/jobs">Explore all Jobs &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 5 }, (_, index) => (
          <JobCard
            key={index}
            jobId={`job-${index + 1}`}
            companyName={["Tesla", "Google", "Apple", "Microsoft", "Meta"][index]}
            companyLogoUrl={`https://github.com/${["tesla", "google", "apple", "microsoft", "facebook"][index]}.png`}
            jobTitle={["Software Engineer", "Product Manager", "UX Designer", "Data Scientist", "Web Developer"][index]}
            timeAgo={`${index + 1} hours ago`}
            employmentType={["Full-time", "Part-time", "Contract", "Internship", "Contract"][index]}
            location={["Remote", "Hybrid", "On-site", "Remote", "Remote"][index]}
            salary={["$100,000 - $120,000", "$80,000 - $100,000", "$70,000 - $90,000", "$90,000 - $110,000", "$80,000 - $100,000"][index]}
            city={["San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX", "San Francisco, CA"][index]}
          />
        ))}
      </div>
      
      {/* Teams */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Find a team mate! </h2>
          <p className="text-xl font-light text-foreground">Join a team looking for a new member🐜!</p>
          <Button variant="link" className="text-lg p-0" asChild>
            <Link to="/teams">Explore all Teams &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }, (_, index) => (
          <TeamCard
            key={index}
            teamId={`team-${index + 1}`}
            leaderUsername={["ㄲㄱ", "dev_user", "coder123", "tech_lead", "startup_founder", "ai_researcher", "game_dev", "fintech_expert", "health_tech", "edtech_innovator"][index]}
            leaderAvatarUrl={`https://github.com/${["sorrynthx", "user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9"][index]}.png`}
            leaderAvatarFallback={["ㄲ", "D", "C", "T", "S", "A", "G", "F", "H", "E"][index]}
            positions={[
              ["React Developer", "Backend Developer", "Data Scientist"],
              ["Frontend Developer", "UI/UX Designer"],
              ["Full Stack Developer", "DevOps Engineer"],
              ["Product Manager", "Marketing Specialist"],
              ["Mobile Developer", "Backend Engineer", "Designer"],
              ["ML Engineer", "Data Engineer", "Frontend Dev"],
              ["Game Developer", "3D Artist", "Sound Designer"],
              ["Backend Developer", "Security Expert", "DevOps"],
              ["Full Stack Developer", "UI/UX Designer", "QA Engineer"],
              ["Frontend Developer", "Backend Developer", "Product Manager"]
            ][index]}
            projectDescription={[
              "a new social media platform",
              "an e-commerce mobile app",
              "a blockchain-based game",
              "a SaaS productivity tool",
              "a food delivery platform",
              "an AI-powered chatbot",
              "a multiplayer mobile game",
              "a fintech payment solution",
              "a healthcare monitoring app",
              "an online learning platform"
            ][index]}
          />
        ))}
      </div>

    </div>
  )
}

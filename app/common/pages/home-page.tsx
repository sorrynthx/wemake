import { Link, type MetaFunction } from "react-router";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import { TeamCard } from "~/features/teams/components/team-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Home 🐳 | wemake" },
    { name: "description", content: "Welcome to wemake" }
  ];
};

export default function HomePage() {
  return (
    <div className="px-20 space-y-40">
      {/* Products */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Today's Products</h2>
          <p className="text-xl font-light text-foreground">The best products made by our community today.</p>
          <Button variant="link" className="text-lg p-0" asChild>
            <Link to="/products/leaderboards">Explore all products &rarr;</Link>
          </Button>
        </div>

        {
          // Array.from은 배열을 생성하는 메서드입니다.
          // 첫 번째 인자인 { length: 10 }은 길이가 10인 배열을 의미하며, 실제 값은 undefined입니다.
          // 두 번째 인자인 콜백의 (_, index)에서 _는 배열의 요소(여기서는 사용하지 않으므로 _로 표기), index는 현재 인덱스를 나타냅니다.
          // 이 코드는 ProductCard 컴포넌트를 10개 생성하기 위해 사용됩니다.
          Array.from({ length: 10 }, (_, index) => (
          <ProductCard
            key={index}
            productId={`product-${index + 1}`}
            name={`Product ${index + 1}`}
            description={`This is a sample description for product ${index + 1}`}
            commentCount={Math.floor(Math.random() * 50) + 5}
            viewCount={Math.floor(Math.random() * 200) + 20}
            upvoteCount={Math.floor(Math.random() * 300) + 50}
          />
          ))
        }
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
            postId={`post-${index + 1}`}
            title={`Waht is the best productivity tool? ${index + 1}`}
            author={`User ${index + 1}`}
            authorAvatarUrl={`https://github.com/user${index + 1}.png`}
            category={["Productivity", "Design", "Development", "Marketing", "Business"][index]}
            timeAgo={`${index + 1} hours ago`}
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

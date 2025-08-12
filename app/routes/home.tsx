import { Link, type MetaFunction } from "react-router";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Home 🐳 | wemake" },
    { name: "description", content: "Welcome to wemake" }
  ];
};

export default function Home() {
  return (
    <div className="px-20 space-y-40">
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

        

    </div>
  )
}

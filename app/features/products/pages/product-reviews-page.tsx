import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/product-reviews-page";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreateReviewDialog from "~/common/components/create-review-dialog";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Reviews | wemake" },
    { name: "description", content: "Read reviews and ratings for this product" }
  ];
}

export default function ProductReviewsPage({ params }: Route.ComponentProps) {
  const { productId } = params;

  // Sample review data - in a real app, this would come from props or API
  const sampleReviews = [
    {
      author: {
        name: "김개발",
        username: "devkim",
        avatarUrl: "https://github.com/devkim.png",
        avatarFallback: "김"
      },
      rating: 5,
      content: "정말 훌륭한 제품입니다! 사용하기 쉽고 기능도 완벽해요. 특히 UI/UX가 직관적이어서 처음 사용하는 사람도 쉽게 적응할 수 있을 것 같습니다. 강력 추천합니다!",
      createdAt: "2 days ago"
    },
    {
      author: {
        name: "이디자인",
        username: "designlee",
        avatarUrl: "https://github.com/designlee.png",
        avatarFallback: "이"
      },
      rating: 4,
      content: "전반적으로 만족스럽습니다. 디자인이 깔끔하고 사용자 경험이 좋아요. 다만 몇 가지 개선할 점이 있다면 더 나을 것 같습니다. 그래도 충분히 추천할 만한 제품입니다.",
      createdAt: "1 week ago"
    },
    {
      author: {
        name: "박마케팅",
        username: "marketingpark",
        avatarUrl: "https://github.com/marketingpark.png",
        avatarFallback: "박"
      },
      rating: 3,
      content: "평범한 제품이라고 생각합니다. 장점도 있고 단점도 있어요. 가격 대비 성능은 괜찮지만, 경쟁 제품들과 비교했을 때 특별한 장점이 부족한 것 같습니다.",
      createdAt: "2 weeks ago"
    },
    {
      author: {
        name: "최기획",
        username: "plannerchoi",
        avatarUrl: "https://github.com/plannerchoi.png",
        avatarFallback: "최"
      },
      rating: 2,
      content: "기대했던 것보다는 아쉽습니다. 기본적인 기능은 작동하지만, 사용자 인터페이스가 복잡하고 성능도 개선이 필요해 보입니다. 현재 상태로는 추천하기 어렵네요.",
      createdAt: "3 weeks ago"
    },
    {
      author: {
        name: "정테스트",
        username: "testjung",
        avatarUrl: "https://github.com/testjung.png",
        avatarFallback: "정"
      },
      rating: 1,
      content: "매우 실망스럽습니다. 버그가 많고 사용하기 어려워요. 고객 지원도 부족하고, 제품의 품질이 가격에 비해 터무니없이 낮습니다. 절대 추천하지 않습니다.",
      createdAt: "1 month ago"
    }
  ];

  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">5 Reviews</h2>
          <DialogTrigger>
            <Button variant={"secondary"}>Write a Review</Button>
          </DialogTrigger>
        </div>

        {/* 리뷰 */}
        <div className="space-y-20">
          {sampleReviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}

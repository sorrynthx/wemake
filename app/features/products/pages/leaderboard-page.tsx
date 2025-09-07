import type { Route } from "./+types/leaderboard-page";
import { HeroSection } from "../../../common/components/hero-section";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { DateTime } from "luxon";
import { getProductsByDateRange } from "~/features/products/queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Leaderboards - WeMake" },
    { name: "description", content: "Top products ranked by popularity and engagement" }
  ];
}

/*
 * loader 함수:
 * - 각 기간(일/주/월/년)별 인기 제품을 실제 DB에서 조회
 * - HomePage의 loader와 동일하게 getProductsByDateRange 유틸을 사용
 */
export const loader = async () => {
  const now = DateTime.now();

  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] = await Promise.all([
    getProductsByDateRange({
      startDate: now.startOf("day"),
      endDate: now.endOf("day"),
      limit: 7,
    }),
    getProductsByDateRange({
      startDate: now.startOf("week"),
      endDate: now.endOf("week"),
      limit: 7,
    }),
    getProductsByDateRange({
      startDate: now.startOf("month"),
      endDate: now.endOf("month"),
      limit: 7,
    }),
    getProductsByDateRange({
      startDate: now.startOf("year"),
      endDate: now.endOf("year"),
      limit: 7,
    }),
  ]);

  return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts };
};

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
  const { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts } = loaderData;

  return (
    <div className="space-y-20">
      <HeroSection
        title="Leaderboards"
        subtitle="The most popular products on wemake"
      />

      {/* Daily */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Daily Leaderboard</h2>
          <p className="text-xl font-light text-foreground">The most popular products on wemake by day.</p>
        </div>

        {dailyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}

        <Button variant="link" asChild className="text-lg self-center p-0">
          <Link to="/products/leaderboards/daily">Explore all products &rarr;</Link>
        </Button>
      </div>

      {/* Weekly */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Weekly Leaderboard</h2>
          <p className="text-xl font-light text-foreground">The most popular products on wemake by week.</p>
        </div>

        {weeklyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}

        <Button variant="link" asChild className="text-lg self-center p-0">
          <Link to="/products/leaderboards/weekly">Explore all products &rarr;</Link>
        </Button>
      </div>

      {/* Monthly */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Monthly Leaderboard</h2>
          <p className="text-xl font-light text-foreground">The most popular products on wemake by month.</p>
        </div>

        {monthlyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}

        <Button variant="link" asChild className="text-lg self-center p-0">
          <Link to="/products/leaderboards/monthly">Explore all products &rarr;</Link>
        </Button>
      </div>

      {/* Yearly */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Yearly Leaderboard</h2>
          <p className="text-xl font-light text-foreground">The most popular products on wemake by year.</p>
        </div>

        {yearlyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}

        <Button variant="link" asChild className="text-lg self-center p-0">
          <Link to="/products/leaderboards/yearly">Explore all products &rarr;</Link>
        </Button>
      </div>
    </div>
  );
}

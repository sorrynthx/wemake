import type { Route } from "./+types/leaderboard-page";
import { HeroSection } from "../../../common/components/hero-section";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Leaderboards - WeMake" },
    { name: "description", content: "Top products ranked by popularity and engagement" }
  ];
}

export default function LeaderboardPage() {

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

        {
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

        {
          Array.from({ length: 7 }, (_, index) => (
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

        {
          Array.from({ length: 4 }, (_, index) => (
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

        {
          Array.from({ length: 3 }, (_, index) => (
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
        <Button variant="link" asChild className="text-lg self-center p-0">
          <Link to="/products/leaderboards/yearly">Explore all products &rarr;</Link>
        </Button>
      </div>

    </div>
  );
}

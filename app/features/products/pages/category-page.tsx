import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/category-page";
import { CategoryCard } from "../components/category-card";
import ProductPagination from "~/common/components/product-pagination";
import { ProductCard } from "../components/product-card";

export const meta: Route.MetaFunction = ({ params }) => {
  const { category } = params;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return [
    { title: `${categoryName} Products | wemake` },
    { name: "description", content: `Discover amazing ${categoryName.toLowerCase()} tools and products` }
  ];
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {

  return (
    <div className="space-y-10">
      {/* 히어로 섹션: 페이지 제목과 부제목 */}
      <HeroSection
        title="Category Detail Page"
        subtitle="This wii show Category Detail Information!"
      />

      {/* Products Card */}
      <div className="space-y-10 w-full max-w-screen-md mx-auto">
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
      </div>

      {/* 페이지네이션 */}
      <ProductPagination
        totalPages={10}
      />
    </div>
  );
}

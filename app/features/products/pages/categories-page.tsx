import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/categories-page";
import { CategoryCard } from "../components/category-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Categories - WeMake" },
    { name: "description", content: "Browse products by category" }
  ];
}

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  const categories = [
    { id: "saas", name: "SaaS", description: "Software as a Service solutions" },
    { id: "ai-ml", name: "AI/ML", description: "Artificial Intelligence and Machine Learning tools" },
    { id: "developer-tools", name: "Developer Tools", description: "Tools for developers and engineers" },
    { id: "design-tools", name: "Design Tools", description: "Creative design and prototyping tools" },
    { id: "marketing-tools", name: "Marketing Tools", description: "Digital marketing and growth tools" },
    { id: "fintech", name: "Fintech", description: "Financial technology and payment solutions" },
    { id: "open-source", name: "Open Source", description: "Open source projects and tools" }
  ];

  return (
    <div className="space-y-10">
      {/* 히어로 섹션: 페이지 제목과 부제목 */}
      <HeroSection
        title="Categories"
        subtitle="Search for Products! by Categories"
      />

      <div className="grid grid-cols-4 gap-10">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
            to={`/products/categories/${category.id}`}
          />
        ))}
      </div>

    </div>
  );
}

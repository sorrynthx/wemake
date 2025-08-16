import type { Route } from "./+types/product-overview-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Overview | wemake" },
    { name: "description", content: "Detailed product information and features" }
  ];
}

export default function ProductOverviewPage({ params }: Route.ComponentProps) {

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h3 className="text-lg font-bold">What is this product ?</h3>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet 테스트 설명입니다. 제품에 대한 설명이 입력될 예정입니다.
        </p>
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold">How does it work ?</h3>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet 테스트 설명입니다. 제품에 대한 설명이 입력될 예정입니다.
        </p>
      </div>

    </div>
  );
}

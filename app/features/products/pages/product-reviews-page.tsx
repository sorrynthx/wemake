import { HeroSection } from "~/common/components/hero-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import type { Route } from "./+types/product-reviews-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Reviews | wemake" },
    { name: "description", content: "Read reviews and ratings for this product" }
  ];
}

export default function ProductReviewsPage({ params }: Route.ComponentProps) {
  const { productId } = params;
  
  
  return (
    <div className="min-h-screen bg-background">
      review page
    </div>
  );
}

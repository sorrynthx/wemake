import { HeroSection } from "~/common/components/hero-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Textarea } from "~/common/components/ui/textarea";
import { Form } from "react-router";
import type { Route } from "./+types/new-product-review-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Write a Review | wemake" },
    { name: "description", content: "Share your experience with this product" }
  ];
}

export default function NewProductReviewPage({ params }: Route.ComponentProps) {
  const { productId } = params;
  
  // Mock product data - in real app this would come from loader
  const product = {
    id: productId,
    name: "AI Dark Mode Maker",
    category: "Developer Tools"
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection 
        title="Write a Review"
        subtitle={`Share your experience with ${product.name}`}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Review for {product.name}</CardTitle>
              <CardDescription>
                Help other users by sharing your honest feedback about this product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form className="space-y-6">
                {/* Rating Selection */}
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating *</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-12 h-12 text-lg hover:text-yellow-500 hover:border-yellow-500"
                      >
                        ★
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click on a star to rate this product
                  </p>
                </div>

                {/* Review Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Review Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Summarize your experience in a few words"
                    required
                  />
                </div>

                {/* Review Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Review Content *</Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Share your detailed experience with this product. What did you like? What could be improved?"
                    rows={6}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Minimum 50 characters. Be specific and helpful to other users.
                  </p>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pros">What you liked (optional)</Label>
                    <Textarea
                      id="pros"
                      name="pros"
                      placeholder="List the things you enjoyed about this product"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cons">What could be improved (optional)</Label>
                    <Textarea
                      id="cons"
                      name="cons"
                      placeholder="List areas where this product could be better"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Use Case */}
                <div className="space-y-2">
                  <Label htmlFor="useCase">How did you use this product? (optional)</Label>
                  <Input
                    id="useCase"
                    name="useCase"
                    placeholder="e.g., Personal project, Work, Education, etc."
                  />
                </div>

                {/* Verification */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="verified"
                      name="verified"
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="verified" className="text-sm">
                      I confirm that this review is based on my genuine experience with this product
                    </Label>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    Submit Review
                  </Button>
                  <Button type="button" variant="outline" className="flex-1">
                    Save Draft
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

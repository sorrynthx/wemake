import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/submit-page";
import { Form } from "react-router";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";

/**
 * 제출 페이지 메타데이터 설정
 * SEO를 위한 제목과 설명을 정의
 */
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | wemake" },
    { name: "description", content: "Submit your amazing product to our community" }
  ];
}

/**
 * 제품 제출 페이지 컴포넌트
 * 사용자가 새로운 제품을 커뮤니티에 제출할 수 있는 폼을 제공
 */
export default function SubmitPage({ loaderData }: Route.ComponentProps) {
  
  return (
    <div>
      {/* 페이지 상단 히어로 섹션 */}
      <HeroSection
        title="Submit Your Product"
        subtitle="Share your product with the world 🌎"
      />
      
      {/* 제품 제출 폼 - 2열 그리드 레이아웃 */}
      <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto">
        <div className="space-y-5">
          
          {/* 제품명 입력 필드 */}
          <InputPair 
            label="Name"
            description="This is the name of your Product!"
            id="name"
            name="name"
            required
            placeholder="Name of your product"
          />

          {/* 제품 태그라인 입력 필드 (60자 제한) */}
          <InputPair
            label="Tagline"
            description="60 characters or less"
            id="tagline"
            name="tagline"
            required
            type="text"
            placeholder="A concise description of your product"
          />

          {/* 제품 URL 입력 필드 */}
          <InputPair
            label="URL"
            description="The URL of your product"
            id="url"
            name="url"
            required
            type="url"
            placeholder="https://example.com"
          />

          {/* 제품 상세 설명 텍스트 영역 */}
          <InputPair
            textArea
            label="Description"
            description="A detailed description of your product"
            id="description"
            name="description"
            required
            type="text"
            placeholder="A detailed description of your product"
          />

          {/* 제품 카테고리 선택 드롭다운 */}
          <SelectPair 
            label="Category"
            description="The category of your product"
            name="category"
            required
            placeholder="Select a category"
            options={[
              { label: "AI", value: "ai" },
              { label: "Design", value: "design" },
              { label: "Marketing", value: "marketing" },
              { label: "Development", value: "development" },
            ]}
          />
        </div>
      </Form>
    </div>
  );
}

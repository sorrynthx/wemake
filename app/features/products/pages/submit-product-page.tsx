import { Hero } from "~/common/components/hero";

import { Form } from "react-router";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState, useEffect } from "react";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/submit-product-page";

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
  // 아이콘 미리보기 URL 상태 관리
  // - string | null 타입으로 선언하여, URL 문자열 또는 값이 없을 때 null을 명확히 표현합니다.
  // - 초기값을 null로 설정해 불필요한 undefined 상태를 피하고 분기 처리를 단순화합니다.
  const [icon, setIcon] = useState<string | null>(null);

  // 파일 선택(change) 이벤트 핸들러
  // - 첫 번째 파일만 사용합니다.
  // - URL.createObjectURL로 브라우저 메모리에 임시 URL(Object URL)을 생성하여 미리보기에 사용합니다.
  // - 주의: 생성된 Object URL은 더 이상 필요 없을 때 반드시 해제해야 메모리 누수를 방지할 수 있습니다.
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setIcon(URL.createObjectURL(file));
    }
    
  }

  // Object URL 정리(cleanup)
  // - icon 값이 변경되거나 컴포넌트가 언마운트될 때 직전의 Object URL을 해제합니다.
  // - 이렇게 하면 사용자가 파일을 여러 번 바꿔도 브라우저 메모리 누수를 방지할 수 있습니다.
  useEffect(() => {
    if (!icon) return;
    return () => {
      URL.revokeObjectURL(icon);
    };
  }, [icon]);
  
  return (
    <div>
      {/* 페이지 상단 히어로 섹션 */}
      <Hero
        title="Submit Your Product"
        subtitle="Share your product with the world 🌎"
      />
      
      {/* 제품 제출 폼 - 2열 그리드 레이아웃 */}
      <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto">
        
        {/* Product Infromation */}
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
          
          {/* 등록 버튼 */}
          <Button type="submit" className="w-full" size="lg">Submit</Button>
        </div>
        
        {/* 아이콘 업로드 섹션 */}
        <div className="flex flex-col space-y-2">
          {/* 아이콘 미리보기 - icon 값이 존재할 때만 렌더링 */}
          {!icon ? null : (
            <div className="size-40 rounded-xl shadow-lx overflow-hidden">
              <img
                src={icon}
                alt="product icon"
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <Label className="flex flex-col gap-1">
            Icon
            <small className="text-muted-foreground">Icon of your product</small>
          </Label>
          {/* 파일 입력 요소
              - type="file" 로 이미지 파일을 업로드합니다.
              - onChange에서 Object URL을 생성하여 미리보기에 사용합니다.
              - accept로 허용 포맷을 제한합니다.
                · 용량 효율: webp, avif 권장
                · 범용 지원: png, jpg/jpeg
                · 아이콘 포맷: svg(벡터), ico(레거시 파비콘)
            */}
          <Input 
            type="file" 
            className="w-1/2" 
            onChange={onChange} 
            required 
            name="icon"
            accept=".png,.jpg,.jpeg,.webp,.svg,.ico,.avif"
          />
          <div className="flex flex-col text-xs">
            <span className="text-muted-foreground">Recommended size: 128x128 px</span>
            <span className="text-muted-foreground">Allowed formats: PNG, JPEG, Webp, SVG</span>
            <span className="text-muted-foreground">Max file size: 1MB</span>
          </div>
        </div>
      </Form>
    </div>
  );
}

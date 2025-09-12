import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/promote-page";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";
import { ko } from "date-fns/locale";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Promote Your Product | wemake" },
    { name: "description", content: "Boost your product's visibility with our promotion packages" }
  ];
}

export default function PromotePage() {
  // 프로모션 기간을 저장하는 상태 (시작일과 종료일)
  const [promotionPeriod, setPromotionPeriod] = useState<DateRange | undefined>();
  
  // 선택된 날짜 범위로부터 총 프로모션 일수 계산
  // DateTime.fromJSDate()로 JavaScript Date 객체를 Luxon DateTime 객체로 변환
  // diff() 메서드로 두 날짜 간의 차이를 'days' 단위로 계산
  // .days 속성으로 숫자 값 추출
  // 날짜가 선택되지 않은 경우 0 반환
  const totalDays = promotionPeriod?.from && promotionPeriod?.to ?
    DateTime.fromJSDate(promotionPeriod.to).diff(DateTime.fromJSDate(promotionPeriod.from), 'days').days
  : 0;
  return (
    <div>
      {/* Hero */}
      <Hero 
        title="Promote Your Product"
        subtitle="Boost your product's visibility!!!"
      />

      <Form className="max-w-sm mx-auto flex flex-col gap-10 items-center">

        <SelectPair 
          label="Select a Product"
          description="Select the product you want to promote"
          name="product"
          placeholder="Select a product"
          options={[
            { label: "AI Dark Mode Maker", value: "ai-dark-mode-maker"},
            { label: "Productivity Tracker Pro", value: "productivity-tracker-pro"},
            { label: "Smart Calendar Assistant", value: "smart-calendar-assistant"},
            { label: "Code Review Helper", value: "code-review-helper"},
            { label: "Design System Generator", value: "design-system-generator"},
            { label: "API Testing Suite", value: "api-testing-suite"},
            { label: "Data Visualization Tool", value: "data-visualization-tool"},
            { label: "Mobile App Builder", value: "mobile-app-builder"},
            { label: "Cloud Storage Manager", value: "cloud-storage-manager"},
            { label: "Security Audit Scanner", value: "security-audit-scanner"}
          ]}
        />

        {/* Calendar */}
        <div className="flex flex-col gap-2 items-center w-full">
          <Label className="flex flex-col gap-1">
            Select a range of dates for promotion {" "}
            <small className="text-muted-foreground text-center">Minimum duration is 3 days</small>
          </Label>
          <Calendar 
            mode="range"
            selected={promotionPeriod}
            onSelect={setPromotionPeriod}
            min={3}
            disabled={{ before: new Date() }}
            numberOfMonths={2}
            locale={ko}
          />
        </div>

        <Button disabled={totalDays === 0}>
          Go to checkout (${totalDays * 20})
        </Button>
      </Form>

    </div>
  );
}

import type { Route } from "./+types/dashboard-product-page";

// 카드 UI 컴포넌트: 통계 박스(제목/내용 등) 레이아웃을 구성합니다.
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

// 차트 관련 유틸 및 컴포넌트: 설정(config), 컨테이너, 툴팁 등을 제공합니다.
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/common/components/ui/chart";

// Recharts의 영역 차트 및 기본 축/그리드 요소를 사용합니다.
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

// meta 설정: 브라우저 탭 제목 등 페이지 메타데이터를 정의합니다.
export const meta: Route.MetaFunction = () => {
  return [{ title: "Product Dashboard | wemake" }];
};

// 차트에 표시될 실제 데이터(월별 페이지뷰, 방문자 수)
// - views: 페이지 뷰 수
// - visitors: 방문자 수
const chartData = [
  { month: "January", views: 186, visitors: 100 },
  { month: "February", views: 305, visitors: 34 },
  { month: "March", views: 237, visitors: 65 },
  { month: "April", views: 73, visitors: 32 },
  { month: "May", views: 209, visitors: 66 },
  { month: "June", views: 214, visitors: 434 },
];

// 차트 설정: 각 데이터 키에 대해 라벨과 색상을 지정합니다.
// ChartContainer 내부에서 --color-{key} CSS 변수로 사용됩니다.
const chartConfig = {
  views: {
    label: "Page Views",
    color: "hsl(var(--primary))",
  },
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

// 대시보드 > Product 페이지 컴포넌트
// - 제목(Analytics)과 카드(Performance)를 렌더링합니다.
// - 카드 안에서 AreaChart로 views/visitors 추이를 시각화합니다.
export default function DashboardProductPage() {
  return (
    <div className="space-y-5">
      {/* 페이지 헤더: 섹션 제목 */}
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>

      {/* 통계 카드: 차트와 설명을 담는 컨테이너 */}
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {/* ChartContainer: chartConfig를 컨텍스트로 제공, 색상/라벨을 하위 차트에서 사용 */}
          <ChartContainer config={chartConfig}>
            {/* AreaChart: Recharts 영역 차트
                - accessibilityLayer: 접근성 레이어 활성화
                - data: chartData 배열
                - margin: 좌/우 마진 지정 */}
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              {/* CartesianGrid: 배경 격자선, 가독성 향상(세로선 비활성화) */}
              <CartesianGrid vertical={false} />

              {/* XAxis: X축 라벨(월) 설정
                  - tickFormatter: "Jan"처럼 앞 3글자만 보이도록 축약 */}
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />

              {/* Area: 페이지 뷰(views) 데이터 시리즈
                  - stroke/fill: CSS 변수로 지정된 색상 사용
                  - type="natural": 곡선 형태
                  - dot={false}: 점 표식을 숨김 */}
              <Area
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                fill="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />

              {/* Area: 방문자 수(visitors) 데이터 시리즈 */}
              <Area
                dataKey="visitors"
                type="natural"
                stroke="var(--color-visitors)"
                fill="var(--color-visitors)"
                strokeWidth={2}
                dot={false}
              />

              {/* ChartTooltip: 마우스 오버 시 값 표시
                  - cursor={false}: 가이드 라인 비활성화
                  - wrapperStyle: 툴팁 최소 너비 지정
                  - content: 커스텀 툴팁 컴포넌트(점 표시 형태) */}
              <ChartTooltip
                cursor={false}
                wrapperStyle={{ minWidth: "200px" }}
                content={<ChartTooltipContent indicator="dot" />}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
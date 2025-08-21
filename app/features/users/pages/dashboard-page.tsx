// import 구문: 필요한 외부 라이브러리와 내부 컴포넌트, 타입을 불러옵니다. 주로 차트와 카드 UI 구성 요소를 사용합니다.
import type { Route } from "./+types/dashboard-page";

import { Line } from "recharts";
import { type ChartConfig, ChartTooltipContent } from "~/common/components/ui/chart";
import { ChartTooltip } from "~/common/components/ui/chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { ChartContainer } from "~/common/components/ui/chart";
import { CartesianGrid, LineChart, XAxis } from "recharts";

// meta 설정: 페이지의 메타데이터(타이틀 등)를 정의합니다. SEO 및 브라우저 탭 제목에 사용됩니다.
export const meta: Route.MetaFunction = () => {
  return [{ title: "Dashboard | wemake" }];
};

// chartData: 월별로 조회수 데이터를 담고 있는 배열입니다. 차트에 표시될 실제 데이터입니다.
const chartData = [
  { month: "January", views: 186 },
  { month: "February", views: 305 },
  { month: "March", views: 237 },
  { month: "April", views: 73 },
  { month: "May", views: 209 },
  { month: "June", views: 214 },
];

// chartConfig: 차트의 데이터 키별로 라벨과 색상을 지정하는 설정 객체입니다. 차트의 스타일 및 라벨링에 활용됩니다.
const chartConfig = {
  views: {
    label: "👁️",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

// DashboardPage 컴포넌트: 대시보드 페이지의 메인 컴포넌트입니다.
// - 페이지 타이틀과 프로필 조회수 카드를 렌더링합니다.
// - 카드 내부에 차트가 포함되어 있습니다.
export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Profile views</CardTitle>
        </CardHeader>
        <CardContent>
          {/* ChartContainer: 차트의 설정을 적용하고, 차트 컴포넌트들을 감싸는 래퍼입니다. */}
          <ChartContainer config={chartConfig}>
            {/* LineChart: recharts 라이브러리의 라인 차트 컴포넌트입니다.
                - 차트 데이터와 마진, 접근성 레이어 등을 설정합니다. */}
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              {/* CartesianGrid: 차트의 배경 그리드를 추가합니다. (세로선은 비활성화) */}
              <CartesianGrid vertical={false} />
              {/* XAxis: X축(월) 설정, tickFormatter로 월 이름을 3글자로 축약 표시 */}
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              // LineChart 관련 부분: 실제로 데이터를 선 그래프로 표시합니다.
              // - dataKey로 데이터를 매핑하고, 선의 색상과 형태, 두께 등을 지정합니다.
              <Line
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />
              // ChartTooltip 부분: 차트에 마우스를 올렸을 때 툴팁을 표시합니다.
              // - cursor는 비활성화하고, content로 커스텀 툴팁 컴포넌트를 사용합니다.
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
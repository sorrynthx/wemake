import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/jobs-page";
import { JobCard } from "../components/job-card";
import { Button } from "~/common/components/ui/button";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constant";
import { useSearchParams } from "react-router";
import { cn } from "~/lib/utils";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Jobs | wemake" },
    { name: "description", content: "Find and apply for jobs in the maker community" },
  ];
}

export default function JobsPage() {
  // URL 검색 파라미터를 관리하는 훅
  // searchParams: 현재 URL의 쿼리 파라미터들을 읽어오는 객체
  // setSearchParams: URL 쿼리 파라미터를 업데이트하는 함수
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * 필터 버튼 클릭 시 호출되는 함수
   * @param key - 필터 타입 (예: "type", "location", "range")
   * @param value - 선택된 필터 값 (예: "full-time", "remote", "$50k-100k")
   * 
   * 동작 방식:
   * 1. searchParams.set()으로 새로운 필터 값을 설정
   * 2. setSearchParams()로 URL을 업데이트
   * 3. replace: true - 브라우저 히스토리에 새 항목을 추가하지 않음
   * 4. preventScrollReset: true - 페이지 스크롤 위치를 유지 (자동으로 맨 위로 스크롤되지 않음)
   */
  const onFilterClick = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams, { replace: true, preventScrollReset: true });
  }

  return (
    <div className="space-y-20">
      {/* 페이지 상단 히어로 섹션 */}
      <HeroSection
        title="Jobs"
        subtitle="Companies looking for makers"
      />

      {/* 메인 콘텐츠 영역 - 6칸 그리드 레이아웃 */}
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-20 items-start">
        {/* 직업 목록 섹션 - 4칸 차지 (3열 그리드) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 gap-5">
          {/* 임시 데이터로 5개의 직업 카드 렌더링 */}
          {Array.from({ length: 5 }, (_, index) => (
            <JobCard
              key={index}
              jobId={`job-${index + 1}`}
              companyName={["Tesla", "Google", "Apple", "Microsoft", "Meta"][index]}
              companyLogoUrl={`https://github.com/${["tesla", "google", "apple", "microsoft", "facebook"][index]}.png`}
              jobTitle={["Software Engineer", "Product Manager", "UX Designer", "Data Scientist", "Web Developer"][index]}
              timeAgo={`${index + 1} hours ago`}
              employmentType={["Full-time", "Part-time", "Contract", "Internship", "Contract"][index]}
              location={["Remote", "Hybrid", "On-site", "Remote", "Remote"][index]}
              salary={["$100,000 - $120,000", "$80,000 - $100,000", "$70,000 - $90,000", "$90,000 - $110,000", "$80,000 - $100,000"][index]}
              city={["San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX", "San Francisco, CA"][index]}
            />
          ))}
        </div>

        {/* 필터 사이드바 - 2칸 차지 */}
        <div className="xl:col-span-2 sticky top-20 flex flex-col gap-10">
          
          {/* 직업 타입 필터 */}
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((type) => (
                <Button 
                  variant={"outline"} 
                  onClick={() => onFilterClick("type", type.value)}
                  className={cn(type.value === searchParams.get("type") ? "bg-accent" : "")}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* 근무 위치 필터 */}
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Location</h4>
            <div className="flex flex-wrap gap-2">
              {LOCATION_TYPES.map((location) => (
                <Button 
                  variant={"outline"} 
                  onClick={() => onFilterClick("location", location.value)}
                  className={cn(location.value === searchParams.get("location") ? "bg-accent" : "")}
                >
                  {location.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* 급여 범위 필터 */}
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Salary</h4>
            <div className="flex flex-wrap gap-2">
              {SALARY_RANGE.map((range) => (
                <Button 
                  variant={"outline"} 
                  onClick={() => onFilterClick("range", range)}
                  className={cn(range === searchParams.get("range") ? "bg-accent" : "")}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}

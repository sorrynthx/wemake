import { DotIcon } from "lucide-react"; // 아이콘 라이브러리에서 점 아이콘 불러오기
import type { Route } from "./+types/job-page"; // 라우트 타입 정의 가져오기
import { Button } from "~/common/components/ui/button"; // 공통 버튼 컴포넌트
import { Badge } from "~/common/components/ui/badge"; // 공통 뱃지 컴포넌트

// 페이지 메타데이터 설정 함수
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Job Details - wemake" }, // 브라우저 탭 타이틀
    { name: "description", content: "View job details and apply" }, // SEO용 설명
  ];
}

export default function JobPage() {
  return (
    <div>
      {/* 상단 배경 이미지 영역 */}
      <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>

      {/* 메인 레이아웃: 좌측(채용 상세) / 우측(요약 정보) */}
      <div className="grid grid-cols-6 -mt-20 gap-20 items-start">
        
        {/* 좌측: 채용 상세 내용 */}
        <div className="col-span-4 space-y-10">
          {/* 회사 로고, 직무명, 회사명 */}
          <div>
            <div className="size-40 bg-white rounded-full  overflow-hidden relative left-10">
              {/* 회사 로고 이미지 */}
              <img
                src="https://github.com/facebook.png"
                className="object-cover"
              />
            </div>
            <h1 className="text-4xl font-bold">Software Engineer</h1> {/* 직무명 */}
            <h4 className="text-lg text-muted-foreground">Meta Inc.</h4> {/* 회사명 */}
          </div>

          {/* 고용 형태 및 근무 형태 */}
          <div className="flex gap-2">
            <Badge variant={"secondary"}>Full-time</Badge>
            <Badge variant={"secondary"}>Remote</Badge>
          </div>

          {/* 섹션: Overview */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">
              This is a full-time remote position for a Software Engineer. We
              are looking for a skilled and experienced Software Engineer to
              join our team.
            </p>
          </div>

          {/* 섹션: Responsibilities */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Design and implement scalable and efficient software solutions",
                "Collaborate with cross-functional teams to ensure timely delivery of projects",
                "Optimize software performance and troubleshoot issues",
              ].map((item) => (
                <li key={item}>{item}</li> // 책임 항목 리스트 렌더링
              ))}
            </ul>
          </div>

          {/* 섹션: Qualifications */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Bachelor's degree in Computer Science or related field",
                "3+ years of experience in software development",
                "Strong proficiency in JavaScript, TypeScript, and React",
              ].map((item) => (
                <li key={item}>{item}</li> // 자격 요건 리스트 렌더링
              ))}
            </ul>
          </div>

          {/* 섹션: Benefits */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Competitive salary",
                "Flexible working hours",
                "Opportunity to work on cutting-edge projects",
              ].map((item) => (
                <li key={item}>{item}</li> // 복지 혜택 리스트 렌더링
              ))}
            </ul>
          </div>

          {/* 섹션: Skills */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="text-lg list-disc list-inside">
              {["JavaScript", "TypeScript", "React"].map((item) => (
                <li key={item}>{item}</li> // 필요 스킬 리스트 렌더링
              ))}
            </ul>
          </div>
        </div>

        {/* 우측: 급여, 위치, 타입, 게시일, 지원 버튼 */}
        <div className="col-span-2 space-y-5 mt-32 sticky top-20 p-6 border rounded-lg">
          {/* 평균 급여 */}
          <div className="flex flex-col">
            <span className=" text-sm text-muted-foreground">Avg. Salary</span>
            <span className="text-2xl font-medium">$100,000 - $120,000</span>
          </div>

          {/* 위치 */}
          <div className="flex flex-col">
            <span className=" text-sm text-muted-foreground">Location</span>
            <span className="text-2xl font-medium">Remote</span>
          </div>

          {/* 근무 타입 */}
          <div className="flex flex-col">
            <span className=" text-sm text-muted-foreground">Type</span>
            <span className="text-2xl font-medium">Full Time</span>
          </div>

          {/* 게시일 및 조회수 */}
          <div className="flex">
            <span className=" text-sm text-muted-foreground">
              Posted 2 days ago
            </span>
            <DotIcon className="size-4" /> {/* 점 아이콘 */}
            <span className=" text-sm text-muted-foreground">395 views</span>
          </div>

          {/* 지원 버튼 */}
          <Button className="w-full">Apply Now</Button>
        </div>
      </div>
    </div>
  );
}

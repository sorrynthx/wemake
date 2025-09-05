// 이 파일은 "Submit Job" 페이지를 렌더링합니다.
// 잡 포스팅 폼 필드와 레이아웃을 포함합니다.
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/submit-job-page";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constants";
import SelectPair from "~/common/components/select-pair";
import InputPair from "~/common/components/input-pair";
import { Form } from "react-router";
import { HeroSection } from "~/common/components/hero-section";

// 페이지 메타데이터(title, description) 설정
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Job - wemake" },
    { name: "description", content: "Submit a new job posting to the community" },
  ];
}

// 잡 제출 폼을 렌더링하는 메인 컴포넌트입니다.
export default function SubmitJobPage() {
  return (
    <div>
      {/* 페이지 헤더와 서브타이틀을 보여줍니다 */}
      <HeroSection
        title="Post a Job"
        subtitle="Reach out to the best developers in the world"
      />
      {/* React Router Form을 사용하는 잡 포스팅 폼입니다 */}
      <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto">
        {/* 입력 필드를 3열 그리드로 배치합니다 */}
        <div className="grid grid-cols-3 w-full gap-10">
          {/* 포지션 입력 필드 */}
          <InputPair
            label="Position"
            description="(40 characters max)"
            name="position"
            maxLength={40}
            type="text"
            id="position"
            required
            placeholder="i.e Senior React Developer"
          />
          {/* 개요(Overview) 입력 필드 */}
          <InputPair
            id="overview"
            label="Overview"
            description="(400 characters max)"
            name="overview"
            maxLength={400}
            type="text"
            required
            placeholder="i.e We are looking for a Senior React Developer"
            textArea
          />
          {/* 주요 업무(Responsibilities) 입력 필드 */}
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            description="(400 characters max, comma separated)"
            name="responsibilities"
            maxLength={400}
            type="text"
            required
            placeholder="i.e Implement new features, Maintain code quality, etc."
            textArea
          />
          {/* 자격 요건(Qualifications) 입력 필드 */}
          <InputPair
            id="qualifications"
            label="Qualifications"
            description="(400 characters max, comma separated)"
            name="qualifications"
            maxLength={400}
            type="text"
            required
            placeholder="i.e 3+ years of experience, Strong TypeScript skills, etc."
            textArea
          />
          {/* 복지(Benefits) 입력 필드 */}
          <InputPair
            id="benefits"
            label="Benefits"
            description="(400 characters max, comma separated)"
            name="benefits"
            maxLength={400}
            type="text"
            required
            placeholder="i.e Flexible working hours, Health insurance, etc."
            textArea
          />
          {/* 필요 기술(Skills) 입력 필드 */}
          <InputPair
            id="skills"
            label="Skills"
            description="(400 characters max, comma separated)"
            name="skills"
            maxLength={400}
            type="text"
            required
            placeholder="i.e React, TypeScript, etc."
            textArea
          />
          {/* 회사 정보 입력 필드: 회사명 */}
          <InputPair
            id="companyName"
            label="Company Name"
            description="(40 characters max)"
            name="companyName"
            maxLength={40}
            type="text"
            required
            placeholder="i.e wemake"
          />
          {/* 회사 정보 입력 필드: 로고 URL */}
          <InputPair
            id="companyLogoUrl"
            label="Company Logo URL"
            description="(40 characters max)"
            name="companyLogoUrl"
            type="url"
            required
            placeholder="i.e https://wemake.services/logo.png"
          />
          {/* 회사 정보 입력 필드: 위치 */}
          <InputPair
            id="companyLocation"
            label="Company Location"
            description="(40 characters max)"
            name="companyLocation"
            maxLength={40}
            type="text"
            required
            placeholder="i.e Remote, New York, etc."
          />
          {/* 지원 URL 입력 필드 */}
          <InputPair
            id="applyUrl"
            label="Apply URL"
            description="(40 characters max)"
            name="applyUrl"
            maxLength={40}
            type="url"
            required
            placeholder="i.e https://wemake.services/apply"
          />
          {/* 잡 타입 선택 필드 */}
          <SelectPair
            label="Job Type"
            description="Select the type of job"
            name="jobType"
            required
            placeholder="Select the type of job"
            options={JOB_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          {/* 잡 위치 선택 필드 */}
          <SelectPair
            label="Job Location"
            description="Select the location of the job"
            name="jobLocation"
            required
            placeholder="Select the location of the job"
            options={LOCATION_TYPES.map((location) => ({
              label: location.label,
              value: location.value,
            }))}
          />
          {/* 연봉 범위 선택 필드 */}
          <SelectPair
            label="Salary Range"
            description="Select the salary range of the job"
            name="salaryRange"
            required
            placeholder="Select the salary range of the job"
            options={SALARY_RANGE.map((salary) => ({
              label: salary,
              value: salary,
            }))}
          />
        </div>
        {/* 이 버튼을 누르면 폼이 제출되며, $100가 청구됩니다 */}
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Post job for $100
        </Button>
      </Form>
    </div>
  );
}

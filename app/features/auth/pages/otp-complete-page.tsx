import type { Route } from "./+types/otp-complete-page"; // 라우트 타입 정의를 위한 import
import { Form } from "react-router"; // react-router의 Form 컴포넌트 import (폼 제출 처리)
import InputPair from "~/common/components/input-pair"; // 사용자 입력을 위한 커스텀 Input 컴포넌트 import
import { Button } from "~/common/components/ui/button"; // 버튼 UI 컴포넌트 import

// 페이지 메타데이터 설정: 브라우저 탭 제목 지정
export const meta: Route.MetaFunction = () => {
  return [{ title: "Verify OTP | wemake" }];
};

// OTP 확인 페이지 컴포넌트
// 사용자가 이메일로 받은 OTP 코드를 입력하여 인증을 완료하는 역할을 수행
export default function OtpPage() {
  return (
    // 페이지 전체 레이아웃: 중앙 정렬 및 세로 방향 배치
    <div className="flex flex-col relative items-center justify-center h-full">
      {/* 컨텐츠 박스: 중앙 정렬, 최대 너비 제한, 요소 간 간격 조절 */}
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        {/* 타이틀 및 설명 영역: 페이지 목적 안내 */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Confirm OTP</h1>
          <p className="text-sm text-muted-foreground">
            Enter the OTP code sent to your email address.
          </p>
        </div>
        {/* 사용자 입력 폼: 이메일과 OTP 입력 필드 및 제출 버튼 포함 */}
        <Form className="w-full space-y-4">
          {/* 이메일 입력 필드: 라벨, 설명, 필수 입력, 이메일 형식 지정 */}
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            id="email"
            required
            type="email"
            placeholder="i.e wemake@example.com"
          />
          {/* OTP 입력 필드: 라벨, 설명, 필수 입력, 숫자 형식 지정 */}
          <InputPair
            label="OTP"
            description="Enter the OTP code sent to your email address"
            name="otp"
            id="otp"
            required
            type="number"
            placeholder="i.e 1234"
          />
          {/* 제출 버튼: 전체 너비, 로그인 액션 수행 */}
          <Button className="w-full" type="submit">
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
}
// 라우트 타입을 가져옵니다. 페이지 메타데이터 타입 정의에 사용됩니다.
import type { Route } from "./+types/otp-start-page";
// 버튼 UI 컴포넌트를 가져옵니다.
import { Button } from "~/common/components/ui/button";
// 입력창 UI 컴포넌트를 가져옵니다.
import { Input } from "~/common/components/ui/input";
// react-router의 Form 컴포넌트를 가져옵니다. 폼 제출에 사용됩니다.
import { Form } from "react-router";
// 이메일 입력용 커스텀 입력 페어 컴포넌트를 가져옵니다.
import InputPair from "~/common/components/input-pair";

// 페이지 메타데이터를 설정합니다. 브라우저 탭 제목 등에 사용됩니다.
export const meta: Route.MetaFunction = () => {
  return [{ title: "Start OTP | wemake" }];
};

// OTP 로그인 시작 페이지 컴포넌트입니다.
// 사용자가 이메일을 입력하고 OTP를 요청할 수 있는 폼을 렌더링합니다.
export default function OtpStartPage() {
  return (
    // 페이지 전체를 감싸는 컨테이너로, 세로 중앙 정렬 및 레이아웃을 담당합니다.
    <div className="flex flex-col relative items-center justify-center h-full">
      {/* 폼 영역을 감싸는 박스, 최대 너비와 간격을 지정합니다. */}
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        {/* 제목과 설명 텍스트를 포함하는 영역 */}
        <div className="text-center">
          {/* 페이지 제목 */}
          <h1 className="text-2xl font-semibold">Log in with OTP</h1>
          {/* 안내 문구 */}
          <p className="text-sm text-muted-foreground">
            We will send you a 4-digit code to log in to your account.
          </p>
        </div>
        {/* 이메일 입력과 제출 버튼을 포함하는 폼 */}
        <Form className="w-full space-y-4">
          {/* 이메일 입력 필드 컴포넌트 */}
          <InputPair
            label="Email" // 입력 필드 라벨
            description="Enter your email address" // 입력 필드 설명
            name="email" // 폼 데이터 이름
            id="email" // DOM 식별자
            required // 필수 입력 필드 지정
            type="email" // 이메일 형식 입력 지정
            placeholder="i.e wemake@example.com" // 입력 필드 플레이스홀더
          />
          {/* OTP 전송 버튼 */}
          <Button className="w-full" type="submit">
            Send OTP
          </Button>
        </Form>
      </div>
    </div>
  );
}
// Button 컴포넌트 import (UI용 버튼)
import { Button } from "~/common/components/ui/button";

// Form, Link 컴포넌트 import (react-router에서 제공)
import { Form, Link } from "react-router";
// InputPair 컴포넌트 import (라벨 + 입력 필드 세트)
import InputPair from "~/common/components/input-pair";
// Route 타입 정의 import
import type { Route } from "./+types/login-page";
import AuthButtons from "../components/auth-buttons";

// 페이지 메타데이터 정의 (브라우저 탭 타이틀 등 설정)
export const meta: Route.MetaFunction = () => {
    return [{ title: "Login | wemake" }];
};

// 로그인 페이지 컴포넌트
export default function LoginPage() {
    return (
        // 페이지 전체 컨테이너 (flexbox로 중앙 정렬)
        <div className="flex flex-col relative items-center justify-center h-full">
            {/* 회원가입 버튼 (우측 상단 고정) */}
            <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
                {/* 회원가입 페이지로 이동하는 Link 컴포넌트 */}
                <Link to="/auth/join">Join</Link>
            </Button>
            {/* 로그인 폼 영역 (가운데 정렬, 최대 너비 제한) */}
            <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
                {/* 제목 */}
                <h1 className="text-2xl font-semibold">Log in to your account</h1>
                {/* 로그인 Form */}
                <Form className="w-full space-y-4">
                    {/* 이메일 입력 필드 */}
                    <InputPair
                        label="Email"
                        description="Enter your email address"
                        name="email"
                        id="email"
                        required
                        type="email"
                        placeholder="i.e wemake@example.com"
                    />
                    {/* 비밀번호 입력 필드 */}
                    <InputPair
                        id="password"
                        label="Password"
                        description="Enter your password"
                        name="password"
                        required
                        type="password"
                        placeholder="i.e wemake@example.com"
                    />
                    {/* 로그인 제출 버튼 */}
                    <Button className="w-full" type="submit">
                        Log in
                    </Button>
                </Form>
                
                {/* 소셜 로그인 */}
                <AuthButtons />
            </div>
        </div>
    )
}
// Button 컴포넌트 가져오기 (UI용 버튼)
import { Button } from "~/common/components/ui/button";
// Form, Link 컴포넌트 가져오기 (react-router에서 제공)
import { Form, Link } from "react-router";

// InputPair 컴포넌트 가져오기 (라벨 + 입력 필드 세트)
import InputPair from "~/common/components/input-pair";
// Route 타입 정의 가져오기
import type { Route } from "./+types/join-page";
import AuthButtons from "../components/auth-buttons";

// 페이지 메타데이터 정의 (브라우저 탭 타이틀 설정)
export const meta: Route.MetaFunction = () => {
    return [{ title: "Join | wemake" }];
};

// 회원가입 페이지 컴포넌트
export default function JoinPage() {
    return (
        // 페이지 전체 컨테이너 (flexbox로 중앙 정렬)
        <div className="flex flex-col relative items-center justify-center h-full">
            {/* 로그인 버튼 (우측 상단 고정) */}
            <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
                {/* 로그인 페이지로 이동하는 Link 컴포넌트 */}
                <Link to="/auth/login">Login</Link>
            </Button>
            {/* 회원가입 폼 영역 (가운데 정렬, 최대 너비 제한) */}
            <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
                {/* 제목 */}
                <h1 className="text-2xl font-semibold">Create an account</h1>
                {/* 회원가입 Form */}
                <Form className="w-full space-y-4">
                    {/* 이름 입력 필드 */}
                    <InputPair
                        label="Name"
                        description="Enter your name"
                        name="name"
                        id="name"
                        required
                        type="text"
                        placeholder="Enter your name"
                    />
                    {/* 사용자 이름 입력 필드 */}
                    <InputPair
                        id="username"
                        label="Username"
                        description="Enter your username"
                        name="username"
                        required
                        type="text"
                        placeholder="i.e wemake"
                    />
                    {/* 이메일 입력 필드 */}
                    <InputPair
                        id="email"
                        label="Email"
                        description="Enter your email address"
                        name="email"
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
                        placeholder="Enter your password"
                    />
                    {/* 회원가입 제출 버튼 */}
                    <Button className="w-full" type="submit">
                        Create account
                    </Button>
                </Form>
                
                {/* 소셜 로그인 */}
                <AuthButtons />
            </div>
        </div>
    )
}
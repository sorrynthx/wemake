// Button 컴포넌트 import (UI용 버튼)
import { Button } from "~/common/components/ui/button";

// Form, Link 컴포넌트 import (react-router에서 제공)
import { Form, Link, redirect, useNavigation } from "react-router";
// InputPair 컴포넌트 import (라벨 + 입력 필드 세트)
import InputPair from "~/common/components/input-pair";
// Route 타입 정의 import
import type { Route } from "./+types/login-page";
import AuthButtons from "../components/auth-buttons";
import { LoaderCircle } from "lucide-react";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Login | wemake" }];
};

// 로그인 페이지 로더 함수 - 인증 상태 확인
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const { data: { user } } = await client.auth.getUser();
  
  // 이미 로그인된 사용자는 홈페이지로 리다이렉트
  if (user) {
    throw redirect("/");
  }
  
  return null;
};

// 로그인 폼 유효성 검사 스키마 정의
// Zod를 사용하여 클라이언트/서버 양쪽에서 일관된 유효성 검사 수행
const formSchema = z.object({
  email: z
    .string({
      message: "이메일은 문자열이어야 합니다",
    })
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 주소를 입력해주세요"),
  password: z
    .string({
      message: "비밀번호는 문자열이어야 합니다",
    })
    .min(1, "비밀번호를 입력해주세요")
    .min(4, "비밀번호는 최소 4자 이상이어야 합니다"),
});

// 로그인 액션 함수 - 폼 제출 처리 및 인증 수행
export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  
  // 폼 데이터 유효성 검사
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  
  if (!success) {
    return {
      loginError: null,
      formErrors: error.flatten().fieldErrors,
    };
  }
  
  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  
  // Supabase를 통한 이메일/비밀번호 로그인 시도
  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  });
  
  if (loginError) {
    return {
      formErrors: null,
      loginError: loginError.message,
    };
  }
  
  // 로그인 성공 시 홈페이지로 리다이렉트
  return redirect("/", { headers });
};

// 로그인 페이지 컴포넌트
export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
    
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      {/* 회원가입 페이지로 이동하는 버튼 */}
      <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
        <Link to="/auth/join">회원가입</Link>
      </Button>
      
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">계정에 로그인하세요</h1>
        
        <Form className="w-full space-y-4" method="post">
          {/* 이메일 입력 필드 */}
          <InputPair
            label="이메일"
            description="이메일 주소를 입력하세요"
            name="email"
            id="email"
            required
            type="email"
            placeholder="예: wemake@example.com"
          />
          {/* 이메일 유효성 검사 오류 표시 */}
          {actionData && "formErrors" in actionData && actionData.formErrors?.email && (
            <p className="text-sm text-red-500">
              {actionData.formErrors.email.join(", ")}
            </p>
          )}
          
          {/* 비밀번호 입력 필드 */}
          <InputPair
            id="password"
            label="비밀번호"
            description="비밀번호를 입력하세요"
            name="password"
            required
            type="password"
            placeholder="4자 이상 입력하세요"
          />
          {/* 비밀번호 유효성 검사 오류 표시 */}
          {actionData && "formErrors" in actionData && actionData.formErrors?.password && (
            <p className="text-sm text-red-500">
              {actionData.formErrors.password.join(", ")}
            </p>
          )}
          
          {/* 로그인 제출 버튼 */}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "로그인"
            )}
          </Button>
          
          {/* 로그인 실패 오류 표시 */}
          {actionData && "loginError" in actionData && (
            <p className="text-sm text-red-500">{actionData.loginError}</p>
          )}
        </Form>
        
        {/* 소셜 로그인 버튼들 */}
        <AuthButtons />
      </div>
    </div>
  );
}
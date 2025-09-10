// 라우트 타입을 가져옵니다. 페이지 메타데이터 타입 정의에 사용됩니다.
import type { Route } from "./+types/otp-start-page";
// 버튼 UI 컴포넌트를 가져옵니다.
import { Button } from "~/common/components/ui/button";
// 입력창 UI 컴포넌트를 가져옵니다.
import { Input } from "~/common/components/ui/input";
// react-router의 Form 컴포넌트를 가져옵니다. 폼 제출에 사용됩니다.
import { Form, redirect, useNavigate, useNavigation } from "react-router";
// 이메일 입력용 커스텀 입력 페어 컴포넌트를 가져옵니다.
import InputPair from "~/common/components/input-pair";

import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircle } from "lucide-react";



export const meta: Route.MetaFunction = () => {
  return [{ title: "Start OTP | wemake" }];
};

const formSchema = z.object({
  email: z.string().email(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { data, success } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { error: "Invalid email address" };
  }
  const { email } = data;

  const { client } = makeSSRClient(request);

  const { error } = await client.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    return { error: "Failed to send OTP" };
  }

  return redirect(`/auth/otp/complete?email=${email}`);
};

export default function OtpStartPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Log in with OTP</h1>
          <p className="text-sm text-muted-foreground">
            We will send you a 4-digit code to log in to your account.
          </p>
        </div>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            id="email"
            required
            type="email"
            placeholder="i.e wemake@example.com"
          />
          {actionData && "error" in actionData && (
            <p className="text-red-500 text-sm">{actionData.error}</p>
          )}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Send OTP"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}
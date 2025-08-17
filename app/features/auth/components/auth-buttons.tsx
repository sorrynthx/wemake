// 아이콘 컴포넌트(Github, Lock, MessageCircle)를 lucide-react 라이브러리에서 가져옵니다.
import { GithubIcon, LockIcon, MessageCircleIcon } from "lucide-react";
// react-router 라이브러리에서 Link 컴포넌트를 가져옵니다.
import { Link } from "react-router";
// 공통 UI 버튼 컴포넌트를 가져옵니다.
import { Button } from "~/common/components/ui/button";
// 공통 UI 구분선(Separator) 컴포넌트를 가져옵니다.
import { Separator } from "~/common/components/ui/separator";

// 소셜 로그인 및 OTP 인증 버튼을 제공하는 인증 버튼 컴포넌트입니다.
export default function AuthButtons() {
  return (
    // 전체 인증 버튼 UI를 감싸는 컨테이너입니다.
    <div className="w-full flex flex-col items-center gap-10">
      {/* 소셜 로그인 안내 텍스트와 구분선 영역입니다. */}
      <div className="w-full flex flex-col items-center gap-2">
        <Separator className="w-full" />
        <span className="text-xs text-muted-foreground uppercase font-medium">
          Or continue with
        </span>
        <Separator className="w-full" />
      </div>
      {/* 소셜 로그인 및 OTP 인증 버튼 목록입니다. */}
      <div className="w-full flex flex-col gap-2">
        {/* 카카오톡 소셜 로그인 버튼입니다. */}
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/kakao/start">
            <MessageCircleIcon className="w-4 h-4" />
            Kakao Talk
          </Link>
        </Button>
        {/* 깃허브 소셜 로그인 버튼입니다. */}
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/github/start">
            <GithubIcon className="w-4 h-4" />
            Github
          </Link>
        </Button>
        {/* OTP 인증 버튼입니다. */}
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/otp/start">
            <LockIcon className="w-4 h-4" />
            OTP
          </Link>
        </Button>
      </div>
    </div>
  );
}
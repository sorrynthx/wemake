// UI Card 관련 컴포넌트 import
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

// 아바타(프로필 이미지) 관련 컴포넌트 import
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";

// 버튼 컴포넌트 import
import { Button } from "~/common/components/ui/button";

// 아이콘 import (눈 모양 아이콘)
import { EyeIcon } from "lucide-react";

// Tailwind 클래스 병합 유틸 함수
import { cn } from "~/lib/utils";

// NotificationCard 컴포넌트 Props 타입 정의
interface NotificationCardProps {
  avatarUrl: string;      // 아바타 이미지 URL
  avatarFallback: string; // 이미지 없을 경우 대체 텍스트
  userName: string;       // 사용자 이름
  message: string;        // 알림 메시지
  timestamp: string;      // 알림 시간
  seen: boolean;          // 읽음 여부
}

// 알림 카드 컴포넌트
export function NotificationCard({
  avatarUrl,
  avatarFallback,
  userName,
  message,
  timestamp,
  seen,
}: NotificationCardProps) {
  return (
    // 카드 컴포넌트 (읽지 않은 알림이면 배경색 강조)
    <Card className={cn("min-w-[450px]", seen ? "" : "bg-yellow-500/60")}>
      {/* 카드 헤더 - 아바타와 사용자 정보 표시 */}
      <CardHeader className="flex flex-row gap-5 space-y-0 items-start">
        <Avatar className="">
          {/* 아바타 이미지 */}
          <AvatarImage src={avatarUrl} />
          {/* 이미지 없을 때 대체 텍스트 */}
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          {/* 사용자 이름과 메시지 */}
          <CardTitle className="text-lg space-y-0 font-bold">
            <span>{userName}</span>
            <span>{message}</span>
          </CardTitle>
          {/* 알림 시간 */}
          <small className="text-muted-foreground text-sm">{timestamp}</small>
        </div>
      </CardHeader>
      {/* 카드 푸터 - 오른쪽에 버튼 배치 */}
      <CardFooter className="flex justify-end">
        {/* 보기 버튼 (아이콘만 표시) */}
        <Button variant="outline" size="icon">
          <EyeIcon className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
// 필요한 컴포넌트 및 타입 불러오기
import { Form } from "react-router";

import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useEffect, useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/settings-page";

// 페이지 메타데이터 설정 (브라우저 탭 타이틀 등)
export const meta: Route.MetaFunction = () => {
  return [{ title: "Settings | wemake" }];
};

// 설정 페이지 메인 컴포넌트
export default function SettingsPage() {
  // 아바타(프로필 이미지) 상태 관리
  const [avatar, setAvatar] = useState<string | null>(null);

  // 파일 업로드 시 아바타 미리보기 설정
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };

  // Object URL 정리(cleanup)
  // - avatar 값이 변경되거나 컴포넌트가 언마운트될 때 직전의 Object URL을 해제합니다.
  // - 이렇게 하면 사용자가 파일을 여러 번 바꿔도 브라우저 메모리 누수를 방지할 수 있습니다.
  useEffect(() => {
    if (!avatar) return;
    return () => {
      URL.revokeObjectURL(avatar);
    };
  }, [avatar]);

  // 전체 레이아웃
  return (
    <div className="space-y-20">
      {/* 왼쪽: 프로필 수정 폼, 오른쪽: 아바타 업로드 섹션 */}
      <div className="grid grid-cols-6 gap-40">
        <div className="col-span-4 flex flex-col gap-10">
          <h2 className="text-2xl font-semibold">Edit profile</h2>
          {/* 프로필 수정 입력 폼 */}
          <Form className="flex flex-col w-1/2 gap-5">
            {/* 이름 입력 필드 */}
            <InputPair
              label="Name"
              description="Your public name"
              required
              id="name"
              name="name"
              placeholder="John Doe"
            />
            {/* 역할 선택 필드 */}
            <SelectPair
              label="Role"
              description="What role do you do identify the most with"
              name="role"
              placeholder="Select a role"
              options={[
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
                { label: "Product Manager", value: "product-manager" },
                { label: "Founder", value: "founder" },
                { label: "Other", value: "other" },
              ]}
            />
            {/* 헤드라인 */}
            <InputPair
              label="Headline"
              description="An introduction to your profile."
              required
              id="headline"
              name="headline"
              placeholder="John Doe"
              textArea
            />
            {/* 소개 입력 필드 */}
            <InputPair
              label="Bio"
              description="Your public bio. It will be displayed on your profile page."
              required
              id="bio"
              name="bio"
              placeholder="John Doe"
              textArea
            />
            <Button className="w-full">Update profile</Button>
          </Form>
        </div>

        {/* 아바타 업로드 영역 */}
        <aside className="col-span-2 p-6 rounded-lg border shadow-md">
          <Label className="flex flex-col gap-1">
            Avatar
            <small className="text-muted-foreground">
              This is your public avatar.
            </small>
          </Label>
          <div className="space-y-5">
            {/* 업로드한 아바타 미리보기 */}
            <div className="size-40 rounded-full shadow-xl overflow-hidden ">
              {avatar ? (
                <img src={avatar} className="object-cover w-full h-full" />
              ) : null}
            </div>
            {/* 파일 선택 입력 (PNG, JPEG 지원) */}
            <Input
              type="file"
              className="w-1/2"
              onChange={onChange}
              required
              name="icon"
            />
            {/* 파일 업로드 가이드 안내 */}
            <div className="flex flex-col text-xs">
              <span className=" text-muted-foreground">
                Recommended size: 128x128px
              </span>
              <span className=" text-muted-foreground">
                Allowed formats: PNG, JPEG
              </span>
              <span className=" text-muted-foreground">Max file size: 1MB</span>
            </div>
            <Button className="w-full">Update avatar</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
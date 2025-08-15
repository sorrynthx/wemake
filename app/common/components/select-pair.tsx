import { useState } from "react";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

/**
 * SelectPair 컴포넌트
 * 
 * 드롭다운 선택 컴포넌트로, 라벨과 설명을 포함한 완전한 폼 필드를 제공합니다.
 * Shadcn UI의 Select 컴포넌트를 기반으로 하며, 접근성과 사용자 경험을 향상시킵니다.
 * 
 * 주요 기능:
 * - 클릭 가능한 라벨로 드롭다운 열기
 * - 라벨과 설명 텍스트 표시
 * - 필수 입력 필드 지원
 * - 동적 옵션 목록 렌더링
 * - 제어된 열림/닫힘 상태 관리
 * 
 * @param name - 폼 제출 시 사용될 필드 이름 (HTML name 속성)
 * @param required - 필수 입력 필드 여부 (HTML required 속성)
 * @param label - 사용자에게 표시될 필드 라벨
 * @param description - 필드 아래에 표시될 설명 텍스트
 * @param placeholder - 선택 전에 표시될 플레이스홀더 텍스트
 * @param options - 선택 가능한 옵션들의 배열 (label과 value 포함)
 */
export default function SelectPair({
    name,
    required,
    label,
    description,
    placeholder,
    options,
}: {
    label: string;
    description: string;
    name: string;
    required?: boolean;
    placeholder: string;
    options: {
        label: string;    // 사용자에게 표시될 옵션 텍스트
        value: string;    // 폼 제출 시 실제 값으로 사용될 문자열
    }[];
}) {
    // 드롭다운의 열림/닫힘 상태를 관리하는 로컬 상태
    // 기본값은 false (닫힌 상태)
    const [open, setOpen] = useState(false);

    return (
        <div className="space-y-2 flex flex-col">
            <Label className="flex flex-col gap-1" onClick={() => setOpen(true)}>
                {label}
                <small className="text-muted-foreground">{description}</small>
            </Label>

            {/* 
                Shadcn UI Select 컴포넌트
                open prop으로 드롭다운 상태를 제어하고
                onOpenChange로 상태 변경을 감지하여 로컬 상태 업데이트
            */}
            <Select open={open} onOpenChange={setOpen} name={name} required={required}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
};
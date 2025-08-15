import type { InputHTMLAttributes } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

/**
 * InputPair 컴포넌트
 * 입력 필드와 텍스트 영역을 모두 지원하는 범용 입력 컴포넌트
 * 
 * @param label - 입력 필드의 라벨 텍스트
 * @param description - 입력 필드 아래에 표시되는 설명 텍스트
 * @param textArea - true일 경우 Textarea, false일 경우 Input 렌더링
 * @param rest - HTML input/textarea 요소의 모든 표준 속성들
 */
export default function InputPair({ 
    label,
    description,
    textArea = false,
    ...rest 
}: {
    label: string,
    description: string,
    textArea?: boolean,
} & (InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>)) {
    return (
        <div className="space-y-2 flex flex-col">
            {/* 라벨과 설명을 포함하는 Label 컴포넌트 */}
            <Label htmlFor={rest.id} className="flex flex-col gap-1">
                {label}
                <small className="text-muted-foreground">{description}</small>
            </Label>
            
            {/* textArea prop에 따라 Input 또는 Textarea 렌더링 */}
            {textArea ? (
                <Textarea rows={4} className="resize-none" {...rest} />
            ) : (
                <Input {...rest} />
            )}
        </div>
    )
}
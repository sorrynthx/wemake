import { Form } from "react-router";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/common/components/ui/dialog";
import InputPair from "./input-pair";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";
import { StarIcon } from "lucide-react";

export default function CreateReviewDialog() {
    // 별점 상태 관리 (0 = 선택되지 않음, 1-5 = 선택된 별점)
    const [rating, setRating] = useState<number>(0);
    // 마우스 호버 시 별점 상태 (시각적 피드백용)
    const [hoveredStar, setHoveredStar] = useState<number>(0);

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-2xl">What do you think of this product ?</DialogTitle>
                <DialogDescription>
                    Share your thoughts and experiences with this product.
                </DialogDescription>
            </DialogHeader>
            <Form className="space-y-10">
                <div>
                    <Label className="flex flex-col gap-1">
                        Ratings {" "}
                        <small className="text-muted-foreground">
                            What would you rate this product ?
                        </small>
                    </Label>
                    {/* 별점 선택 영역 */}
                    <div className="flex gap-2 mt-5">
                        {/* 5개의 별점을 순회하며 렌더링 */}
                        {[1, 2, 3, 4, 5].map((star) => (
                            <label key={star} className="relative cursor-pointer"
                                onMouseEnter={() => setHoveredStar(star)} // 마우스 진입 시 호버 상태 설정
                                onMouseLeave={() => setHoveredStar(0)}   // 마우스 이탈 시 호버 상태 초기화
                            >
                                <StarIcon 
                                    className="size-5 text-yellow-400" 
                                    fill={
                                        // 호버된 별이거나 선택된 별이면 채워진 상태로 표시
                                        hoveredStar >= star || rating >= star ? "currentColor" : "none"
                                    }
                                />
                                {/* 숨겨진 라디오 버튼 (접근성 및 폼 제출용) */}
                                <input 
                                    type="radio" 
                                    value={star} 
                                    name="rating"
                                    required 
                                    className="opacity-0 h-px w-px absolute" 
                                    onChange={() => setRating(star)} // 별점 선택 시 상태 업데이트
                                />
                            </label>
                        ))}
                        
                        {/* 선택된 별점 표시 (한국어) */}
                        {rating > 0 && (
                            <div className="ml-3 flex items-center">
                                <span className="text-sm font-medium text-gray-700">
                                    {rating}점 선택됨
                                </span>
                                {/* 선택된 별점에 따른 텍스트 설명 */}
                                <span className="ml-2 text-xs text-gray-500">
                                    {rating === 1 && "매우 나쁨"}
                                    {rating === 2 && "나쁨"}
                                    {rating === 3 && "보통"}
                                    {rating === 4 && "좋음"}
                                    {rating === 5 && "매우 좋음"}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* 리뷰 텍스트 - TextArea */}
                <InputPair
                    textArea
                    label="Review"
                    id="review"
                    description="Maximum 1,000 characters."
                    required
                    placeholder="Tell us more about this product!" 
                />
                <DialogFooter>
                    <Button type="submit">Submit review</Button>
                </DialogFooter>
            </Form>
        </DialogContent>
    )
}
import { useSearchParams } from "react-router";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type ProductPaginationProps = {
    totalPages: number;
}

export default function ProductPagination({ totalPages }: ProductPaginationProps) {

    const [searchParams, setSearchParams] = useSearchParams();
    
    // URL에서 page 파라미터를 가져와서 현재 페이지 번호 계산
    // URL에 page 파라미터가 없거나 유효하지 않은 숫자인 경우 기본값 1 사용
    const currentPageParam = searchParams.get("page");
    const currentPageNumber = currentPageParam && !isNaN(Number(currentPageParam)) ? Number(currentPageParam) : 1;
    
    // 디버깅을 위한 로그: 현재 페이지와 모든 검색 파라미터 출력
    console.log(`현재 페이지: ${currentPageNumber}`);
    console.log(`모든 검색 파라미터:`, Object.fromEntries(searchParams.entries()));
    
    // 각 파라미터의 개별 값 확인을 위한 로그
    console.log(`페이지 파라미터:`, searchParams.get("page"));
    console.log(`키워드 파라미터:`, searchParams.get("keyword"));
    
    // 새로운 페이지 번호로 이동할 때 사용할 URL 생성 함수
    // 기존 검색 파라미터(keyword, category 등)를 유지하면서 page만 업데이트
    const generatePageUrl = (targetPageNumber: number) => {
        const updatedSearchParams = new URLSearchParams(searchParams);
        updatedSearchParams.set("page", targetPageNumber.toString());
        const pageUrl = `?${updatedSearchParams.toString()}`;
        console.log(`페이지 이동: ${pageUrl}`);
        return pageUrl;
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* 이전 페이지 버튼들: 첫 페이지가 아닐 때만 표시 */}
                {
                    currentPageNumber === 1 ? null
                        : (
                            <>
                                <PaginationItem>
                                    <PaginationPrevious to={generatePageUrl(currentPageNumber - 1)} preventScrollReset />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink to={generatePageUrl(currentPageNumber - 1)}>{currentPageNumber - 1}</PaginationLink>
                                </PaginationItem>
                            </>
                        )
                }
                
                {/* 현재 페이지 표시 */}
                <PaginationItem>
                    <PaginationLink to={generatePageUrl(currentPageNumber)} isActive>
                        {currentPageNumber}
                    </PaginationLink>
                </PaginationItem>
                
                {/* 다음 페이지 버튼들: 마지막 페이지가 아닐 때만 표시 */}
                {
                    currentPageNumber === totalPages ? null
                        : (
                            <>
                                <PaginationItem>
                                    <PaginationLink to={generatePageUrl(currentPageNumber + 1)}>
                                        {currentPageNumber + 1}
                                    </PaginationLink>
                                </PaginationItem>

                                {/* 페이지 건너뛰기 표시: 다음 페이지가 마지막 페이지가 아닐 때만 표시 */}
                                {
                                    currentPageNumber + 1 === totalPages ? null
                                        : (
                                            <>
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            </>
                                        )
                                }
                                <PaginationItem>
                                    <PaginationNext to={generatePageUrl(currentPageNumber + 1)} preventScrollReset />
                                </PaginationItem>
                            </>
                        )
                }
            </PaginationContent>
        </Pagination>
    );
}
import { useSearchParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

/**
 * ProductPagination
 * -----------------------------------------------------------------------------
 * URL의 `?page=` 쿼리스트링을 기준으로 현재 페이지를 계산하고,
 * 이전/다음 및 인접한 페이지 링크를 표시하는 간단한 페이지네이션 컴포넌트.
 *
 * 기술 포인트
 * - React Router v7의 `useSearchParams()`를 사용해 쿼리 파라미터를 읽고/갱신한다.
 * - `setSearchParams` 호출 시 URL이 업데이트되며, 해당 라우트가 데이터 로더(예: loader/useLoaderData)를
 *   사용 중이라면 통상적으로 데이터 리패칭이 일어난다.
 * - `preventScrollReset: true` 옵션으로 페이지 전환 시 스크롤 위치를 유지한다(UX 개선).
 *
 * 사용 가정
 * - 서버/클라이언트 어느 쪽에서든 `totalPages`(전체 페이지 수)를 알고 있다는 전제.
 * - `page`는 1부터 시작하는 자연수로 관리한다.
 *
 * 접근성/UX
 * - 첫 페이지에서는 "Previous"를 숨기고, 마지막 페이지에서는 "Next"를 숨긴다.
 * - 현재 페이지는 `isActive`로 시각적으로 강조한다.
 *
 * 주의사항
 * - 쿼리스트링의 `page` 값이 숫자가 아니면 `Number()` 결과가 `NaN`이 될 수 있다.
 *   현재 코드는 기본값 1을 주지만, 잘못된 값이 들어왔을 때의 방어 로직이 더 필요하다면
 *   `Number.isNaN(page)` 체크 후 1로 보정하거나, 허용 범위를 벗어나는 경우 보정하는 로직을 고려하자.
 * - `totalPages`는 1 이상의 정수여야 하며, 비동기 데이터 의존 시 로딩 상태에서의 스켈레톤 처리도 검토.
 *
 * 확장 아이디어
 * - 처음/마지막/중간 범위를 더 많이 노출하는 "1 ... 4 5 [6] 7 8 ... 20" 형태로 확장 가능.
 * - 모바일에서는 아이콘만, 데스크톱에서는 숫자+텍스트를 노출하는 반응형 전략 적용 가능.
 */

type ProductPaginationProps = {
  /** 전체 페이지 수 (예: 총 123개 항목, 페이지당 20개라면 Math.ceil(123/20)) */
  totalPages: number;
};

export default function ProductPagination({
  totalPages,
}: ProductPaginationProps) {
  /**
   * React Router의 URLSearchParams 읽기/쓰기 훅
   * - `searchParams`: 현재 URL의 쿼리 파라미터를 읽는다.
   * - `setSearchParams`: 쿼리 파라미터를 갱신하면서 내비게이션(히스토리 push)을 유발한다.
   */
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * 현재 페이지 계산
   * - `?page=숫자`를 Number로 변환한다.
   * - 값이 없으면 1을 기본값으로 사용한다.
   *   ⚠️ `?page=abc` 같은 잘못된 값이 들어오면 `Number('abc')`는 NaN이 되므로
   *      필요 시 `Number.isNaN()`으로 보정 로직을 추가하는 것을 권장.
   */
  const page = Number(searchParams.get("page") ?? 1);

  /**
   * onClick 헬퍼
   * - 내부적으로 URL 쿼리스트링의 `page` 값을 갱신한다.
   * - `preventScrollReset: true`로 스크롤 위치를 유지한다(페이지네이션 시 유용).
   */
  const onClick = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  /**
   * 렌더링 전략
   * - 현재 페이지를 중심으로 "이전 페이지, 현재 페이지, 다음 페이지"만 노출한다.
   * - 첫 페이지에서는 이전 관련 요소를 숨김, 마지막 페이지에서는 다음 관련 요소를 숨김.
   * - 더 많은 페이지 번호를 노출하려면 조건/반복을 확장하면 된다.
   */
  return (
    <div>
      <Pagination>
        <PaginationContent>
          {/* 현재 페이지가 1이면 '이전' 영역을 숨긴다 */}
          {page === 1 ? null : (
            <>
              {/* '이전' 버튼: 실제 내비게이션은 막고, 쿼리만 갱신 */}
              <PaginationItem>
                <PaginationPrevious
                  to={`?page=${page - 1}`}
                  onClick={(event) => {
                    // a 태그 기본 이동을 막고(SSR/CSR 환경 통일), 훅으로만 URL 갱신
                    event.preventDefault();
                    onClick(page - 1);
                  }}
                />
              </PaginationItem>

              {/* 이전 페이지 숫자 링크 */}
              <PaginationItem>
                <PaginationLink
                  to={`?page=${page - 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page - 1);
                  }}
                >
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {/* 현재 페이지 (활성 상태 표시) */}
          <PaginationItem>
            <PaginationLink
              to={`?page=${page}`}
              onClick={(event) => {
                event.preventDefault();
                onClick(page);
              }}
              isActive
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {/* 현재 페이지가 마지막이면 '다음' 영역을 숨긴다 */}
          {page === totalPages ? null : (
            <>
              {/* 다음 페이지 숫자 링크 */}
              <PaginationItem>
                <PaginationLink
                  to={`?page=${page + 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page + 1);
                  }}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>

              {/* 다음 페이지가 곧바로 마지막이면 ... 생략부는 숨긴다 */}
              {page + 1 === totalPages ? null : (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* '다음' 버튼 */}
              <PaginationItem>
                <PaginationNext
                  to={`?page=${page + 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page + 1);
                  }}
                />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
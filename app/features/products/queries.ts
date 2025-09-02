import { DateTime } from "luxon";
import client from "~/supa-client";
import { PAGE_SIZE } from "./contants";

/**
 * 제품 조회/페이지 계산 쿼리 유틸
 * -----------------------------------------------------------------------------
 * - Luxon의 DateTime을 입력으로 받아 Supabase(Postgres)에서 기간 필터링한다.
 * - 통계(stats) JSONB 컬럼에서 upvotes/views/reviews를 꺼내 별칭으로 반환한다.
 * - 모든 함수는 '런타임 로직 변경 없이' 주석만 보강했다.
 *
 * ⚙️ 전제 조건
 * - 테이블: products
 *   - 컬럼: product_id (PK), name, description, created_at (timestamp/timestamptz),
 *           stats (JSONB: { upvotes: number, views: number, reviews: number, ... })
 * - 상수: PAGE_SIZE (페이지당 항목 수)
 *
 * 🕒 시간/타임존 주의
 * - `DateTime#toISO()`는 ISO 문자열을 생성한다. 앱/DB의 타임존 정책(UTC 고정 vs 지역시간)을
 *   일관되게 맞추지 않으면 경계시점(자정 등)에서 누락/중복이 생길 수 있다.
 *   필요 시 `toUTC().toISO()`와 같이 명시적으로 UTC로 변환해 사용하는 것도 고려하자.
 */

/**
 * getProductsByDateRange
 * -----------------------------------------------------------------------------
 * 주어진 날짜 구간(startDate ~ endDate) 안에 생성된 제품들을 조회한다.
 * - 정렬: stats->>upvotes(문자열 추출) 기준 내림차순.
 * - 페이징: 1-based page를 받아 range(offset, limit)로 변환.
 *
 * @param startDate  포함 시작일 (Luxon DateTime)
 * @param endDate    포함 종료일 (Luxon DateTime)
 * @param limit      (미사용) 호출부에서 PAGE_SIZE와 동일하게 관리하더라도,
 *                   현재 쿼리는 range 계산에 PAGE_SIZE만 사용한다.
 * @param page       1부터 시작하는 페이지 번호. 기본값 1.
 * @returns          product_id, name, description, upvotes, views, reviews
 *
 * 참고
 * - `.order("stats->>upvotes")`는 JSON 텍스트 추출이라 문자 정렬이 된다.
 *   DB에 numeric으로 저장되어 있거나 캐스팅이 필요하면
 *   `.order(" (stats->>'upvotes')::int ", { ascending: false, nullsFirst: false, foreignTable: undefined })`
 *   처럼 캐스팅 식을 사용해야 한다. (Supabase의 SQL 표현 허용 범위 확인 필요)
 * - `.range(a, b)`는 양끝 포함(inclusive) 인덱스다. (0..PAGE_SIZE-1)
 */
export const getProductsByDateRange = async ({
  startDate,
  endDate,
  limit,
  page = 1,
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit: number;
  page?: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(
      `
        product_id,
        name,
        description,
        upvotes:stats->>upvotes,
        views:stats->>views,
        reviews:stats->>reviews
    `
    )
    // 👍 인기순 정렬(문자열 정렬 주의: 위 참고 참고)
    .order("stats->>upvotes", { ascending: false })
    // created_at이 [startDate, endDate] 범위에 포함되도록 필터
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO())
    // 페이징: 1페이지일 때 0 ~ PAGE_SIZE-1
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  // 에러 발생 시 상위 호출부에서 처리하게 throw
  if (error) throw error;

  // data는 타입상 any[]일 수 있음. 호출부에서 Zod로 파싱/검증 고려.
  return data;
};

/**
 * getProductPagesByDateRange
 * -----------------------------------------------------------------------------
 * 주어진 날짜 구간에 해당하는 전체 행 수를 count로만 받아 페이지 수를 계산한다.
 * - `head: true` + `select(..., { count: "exact" })` 패턴은
 *   실제 행을 가져오지 않고 카운트만 수행(네트워크 효율).
 *
 * @param startDate  포함 시작일 (Luxon DateTime)
 * @param endDate    포함 종료일 (Luxon DateTime)
 * @returns          최소 1 이상의 페이지 수(Math.ceil(count / PAGE_SIZE))
 *
 * 주의
 * - count가 0이더라도 UI 목적으로 1페이지는 존재하게 하려면 아래와 같이 1을 반환한다.
 * - 페이지네이션 UI에서 "다음/이전" 버튼 비활성화 처리가 필요하다.
 */
export const getProductPagesByDateRange = async ({
  startDate,
  endDate,
}: {
  startDate: DateTime;
  endDate: DateTime;
}) => {
  const { count, error } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO());

  if (error) throw error;

  // 결과가 0 또는 undefined일 때 최소 1페이지를 보장
  if (!count) return 1;

  return Math.ceil(count / PAGE_SIZE);
};
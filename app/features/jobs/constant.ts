/**************************************
 * 도메인 상수 정의
 * - label: 사용자에게 노출되는 이름
 * - value: DB/로직에서 사용하는 실제 값(ENUM 원소와 1:1 매칭)
 * - UI 옵션, 밸리데이션, 서버 스키마(pgEnum) 모두에서 재사용 가능하도록 분리했다.
 **************************************/

export const JOB_TYPES = [
  {
    label: "Full-Time",
    value: "full-time",
  },
  {
    label: "Part-Time",
    value: "part-time",
  },
  {
    label: "Remote",
    value: "remote",
  },
  {
    label: "Internship",
    value: "internship",
  },
  {
    label: "Freelance",
    value: "freelance",
  }
] as const;

export const LOCATION_TYPES = [
  {
    label: "Remote",
    value: "remote",
  },
  {
    label: "In-Person",
    value: "in-person",
  },
  {
    label: "Hybrid",
    value: "hybrid",
  },
] as const;

/**************************************
 * 급여 구간
 * - `as const`로 각 항목을 리터럴 타입으로 고정해, Drizzle pgEnum의 values 인자로 그대로 전달할 수 있다.
 * - 문자열 변경/추가는 스키마 변경(ENUM 값 변경)으로 이어지므로 마이그레이션을 생성/적용해야 한다.
 **************************************/
export const SALARY_RANGE = [
  "$0 - $50,000",
  "$50,000 - $70,000",
  "$70,000 - $100,000",
  "$100,000 - $120,000",
  "$120,000 - $150,000",
  "$150,000 - $250,000",
  "$250,000+",
] as const;
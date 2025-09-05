/****
 * Drizzle ORM 스키마: jobs 모듈
 * - PostgreSQL 전용 타입(enum)과 테이블을 정의한다.
 * - enum은 pgEnum()으로 DB 레벨 ENUM 타입을 만든 뒤, 컬럼에서 함수 호출 형태(jobTypes())로 사용한다.
 */

import { bigint, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "./constants";

/**
 * pgEnum("job_type", values)
 * - DB에 이름이 "job_type"인 ENUM 타입을 생성한다.
 * - 두 번째 인자는 허용되는 문자열 리터럴의 목록.
 * - 여기서는 UI/도메인 상수인 JOB_TYPES([{ label, value } ...])에서 value 값만 추출해 전달한다.
 * - Drizzle은 튜플 타입([string, ...string[]])을 요구하므로 as [string, ...string[]]로 캐스팅한다.
 * - 반환값(jobTypes)은 "ENUM 컬럼 팩토리"이며, 실제 컬럼에서는 jobTypes()처럼 호출해서 사용한다.
 *   (ex. job_type: jobTypes().notNull())
 *
 * 마이그레이션 주의사항
 * - enum 값 추가/삭제는 스키마(DDL) 변경이다.
 *   1) 값 추가: 새로운 값을 values 배열에 추가 → 마이그레이션 생성/적용
 *   2) 값 변경/삭제: 기존 데이터가 해당 값을 쓰지 않도록 먼저 UPDATE → 이후 enum에서 제거
 */
export const jobTypes = pgEnum(
  "job_type",
  JOB_TYPES.map((type) => type.value) as [string, ...string[]]
);

/**
 * pgEnum("location_type", values)
 * - 위치 유형(원격/오프라인/하이브리드)에 대한 ENUM.
 * - 위와 동일하게 LOCATION_TYPES에서 value만 추출해 전달.
 */
export const locationTypes = pgEnum(
  "location_type",
  LOCATION_TYPES.map((type) => type.value) as [string, ...string[]]
);

/**
 * pgEnum("salary_range", values)
 * - 급여 구간은 단순 문자열 상수(SALARY_RANGE)를 그대로 전달한다.
 * - SALARY_RANGE는 `as const`로 선언되어 각 항목이 리터럴 타입으로 고정되어 있으므로 추가 캐스팅이 필요 없다.
 */
export const salaryRanges = pgEnum("salary_range", SALARY_RANGE);

/**
 * 테이블: jobs
 * - 구인 공고 정보를 저장한다.
 */
export const jobs = pgTable("jobs", {
  /**
   * 기본키. PostgreSQL BIGINT → JS number로 매핑.
   * GENERATED ALWAYS AS IDENTITY: 오토 인크리먼트(시퀀스) 사용.
   */
  job_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),

  /** 채용 포지션(예: Backend Engineer) */
  position: text().notNull(),
  /** 포지션 개요/설명(상단 요약) */
  overview: text().notNull(),
  /** 주요 업무(Responsibilities) */
  responsibilities: text().notNull(),
  /** 자격 요건(Qualifications) */
  qualifications: text().notNull(),
  /** 복지/혜택(Benefits) */
  benefits: text().notNull(),
  /** 요구 스킬(콤마 구분 문자열 등) */
  skills: text().notNull(),

  /** 회사명 */
  company_name: text().notNull(),
  /** 회사 로고 URL */
  company_logo: text().notNull(),
  /** 회사 위치(표시용 문자열) */
  company_location: text().notNull(),
  /** 지원 링크 URL */
  apply_url: text().notNull(),

  /** 고용 형태 ENUM(Full-Time/Part-Time/Remote 등) */
  job_type: jobTypes().notNull(),
  /** 근무 형태 ENUM(Remote/In-Person/Hybrid) */
  location: locationTypes().notNull(),
  /** 급여 구간 ENUM(문자열 범위) */
  salary_range: salaryRanges().notNull(),

  /** 생성 일시: DB 서버 시간이 기본값 */
  created_at: timestamp().notNull().defaultNow(),
  /** 수정 일시: 애플리케이션에서 업데이트 시 갱신 권장 */
  updated_at: timestamp().notNull().defaultNow(),
});
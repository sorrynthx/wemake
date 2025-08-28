import {
  bigint,
  check,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { PRODUCT_STAGES } from "./constants";
import { sql } from "drizzle-orm";

/**
 * product_stage ENUM 정의
 * ------------------------------------------------------------
 * pgEnum(name, values)
 *  - PostgreSQL의 ENUM 타입을 Drizzle 타입으로 선언한다.
 *  - name: 생성할 ENUM 타입의 식별자("product_stage").
 *  - values: 허용되는 문자열 집합.
 *
 * PRODUCT_STAGES.map((s) => s.value)
 *  - ./constants 에서 관리하는 스테이지 상수(예: { label, value } 형태)를
 *    실제 ENUM 값 배열로 변환한다.
 *
 * `as [string, ...string[]]`
 *  - 최소 1개 이상의 문자열이 들어가는 **비어 있지 않은 튜플 타입**을 강제한다.
 *  - 이유: pgEnum(values)의 타입 추론이 빈 배열을 허용하면 안 되기 때문.
 *    이 캐스팅으로 컴파일 타임에 values가 비어 있지 않음을 보장한다.
 *
 * 참고: JPA 기준으로 보면 @Enumerated(EnumType.STRING)과 유사하게
 *  DB에 문자열로 저장되는 열거형이다.
 */
export const productStage = pgEnum(
  "product_stage",
  PRODUCT_STAGES.map((stage) => stage.value) as [string, ...string[]]
);

/**
 * team 테이블
 * ------------------------------------------------------------
 * - team_id: BIGINT PK, GENERATED ALWAYS AS IDENTITY
 *   (PostgreSQL 시퀀스 기반 자동증가; JPA의 @GeneratedValue(strategy = IDENTITY) 유사)
 * - product_name: 제품명
 * - team_size: 팀원 수
 * - equity_split: 지분 분배 비율/점수(비즈니스 규칙에 맞게 해석)
 * - product_stage: ENUM(product_stage)
 * - roles: 핵심 역할/모집 포지션 목록(쉼표/JSON 등 표현 방식은 애플리케이션 규약에 따름)
 * - product_description: 제품 설명
 * - created_at/updated_at: 생성/수정 시각
 */
export const team = pgTable(
  "team",
  {
    team_id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    product_name: text().notNull(),
    team_size: integer().notNull(),
    equity_split: integer().notNull(),
    product_stage: productStage().notNull(),
    roles: text().notNull(),
    product_description: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  /**
   * 체크 제약조건(check) & sql 태그드 템플릿 상세
   * ------------------------------------------------------------
   * check(name, predicate)
   *  - 생성되는 테이블에 DB 레벨의 CHECK 제약조건을 추가한다.
   *  - INSERT/UPDATE 시 predicate가 false이면 DB가 거절한다.
   *
   * sql`...`
   *  - Drizzle이 제공하는 **태그드 템플릿**으로, 원시 SQL 조각을 안전하게 생성한다.
   *  - `${table.column}`처럼 테이블/컬럼 식별자를 바인딩하면 SQL 인젝션 없이
   *    적절히 이스케이프된 식별자로 변환된다.
   *
   * 아래 제약조건들:
   *  - team_size_check: 팀원 수가 1~100 범위인지 검증
   *  - equity_split_check: 지분 값이 1~100 범위인지 검증
   *  - product_description_check: 설명 길이가 200자 이하인지 검증
   *    (PostgreSQL LENGTH는 문자 길이 기준)
   *
   * JPA 비교 관점:
   *  - @Column(length=200) 등 DDL 힌트를 주는 방식과 달리,
   *    CHECK는 **데이터 무결성**을 DB 레벨에서 강제한다.
   */
  (table) => [
    check("team_size_check", sql`${table.team_size} BETWEEN 1 AND 100`),
    check("equity_split_check", sql`${table.equity_split} BETWEEN 1 AND 100`),
    check(
      "product_description_check",
      sql`LENGTH(${table.product_description}) <= 200`
    ),
  ]
);
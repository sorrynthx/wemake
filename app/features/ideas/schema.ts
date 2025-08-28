/**
 * Drizzle + PostgreSQL 스키마 주석
 *
 * 이 파일에서 사용한 주요 옵션/타입 함수 설명:
 * - bigint({ mode: "number" }):
 *   PostgreSQL의 BIGINT 컬럼을 Drizzle에서 매핑. mode를 "number"로 주면 TS 타입이 number로 추론됨
 *   (주의: JS number는 2^53-1 한계가 있으므로 매우 큰 값이면 string 모드를 고려).
 * - integer(): PostgreSQL INTEGER 컬럼 매핑. 일반 정수 용도.
 * - text(): PostgreSQL TEXT 컬럼 매핑. 가변 길이 문자열.
 * - timestamp(): PostgreSQL TIMESTAMP(타임존 없음) 매핑. `defaultNow()`로 현재시간 기본값 설정 가능.
 * - uuid(): PostgreSQL UUID 컬럼 매핑. `references()`로 외래키 연결에 자주 사용.
 * - pgTable("name", { ... }): 지정한 이름의 테이블을 정의.
 * - primaryKey({ columns: [...] }):
 *   복합 기본키 정의. 단일 기본키는 각 컬럼에 `.primaryKey()` 체이닝으로도 가능.
 * - .primaryKey(): 해당 컬럼을 기본키로 지정.
 * - .generatedAlwaysAsIdentity():
 *   PostgreSQL의 `GENERATED ALWAYS AS IDENTITY` 사용(자동 증가). 수동으로 값 넣기보다 DB가 항상 생성.
 * - .default(value): 컬럼 기본값. 예: `.default(0)` → INSERT 시 값이 없으면 0 저장.
 * - .defaultNow(): TIMESTAMP 컬럼에 현재시간 기본값.
 * - .notNull(): NULL 금지 제약.
 * - .references(() => targetColumn, { onDelete: "cascade" }):
 *   외래키 제약. `onDelete: "cascade"`는 참조 대상이 삭제되면 이 행도 자동 삭제.
 */
import {
    bigint,
    integer,
    pgTable,
    primaryKey,
    text,
    timestamp,
    uuid,
  } from "drizzle-orm/pg-core";
  import { profiles } from "../users/schema";
  
// GPT가 제안한 아이디어를 저장하는 테이블
  export const gptIdeas = pgTable("gpt_ideas", {
    // 아이디어 고유 ID (BIGINT, 자동 증가 IDENTITY, 기본키)
    gpt_idea_id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    // 아이디어 내용 (TEXT, 필수)
    idea: text().notNull(),
    // 조회수 (INTEGER, 기본값 0)
    views: integer().notNull().default(0),
    // 아이디어가 할당(클레임)된 시각 (NULL 허용)
    claimed_at: timestamp(),
    // 아이디어를 클레임한 사용자 프로필 ID (UUID, profiles.profile_id FK, 삭제 시 CASCADE)
    claimed_by: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    // 생성일시 (TIMESTAMP, 기본값 NOW)
    created_at: timestamp().notNull().defaultNow(),
  });
  
// 아이디어 좋아요(Like) 기록 테이블 (사용자-아이디어 N:M 관계, 중복 방지 목적의 복합 PK)
  export const gptIdeasLikes = pgTable("gpt_ideas_likes", {
      // 좋아요 대상 아이디어 ID (BIGINT, gpt_ideas.gpt_idea_id 참조, 삭제 시 CASCADE)
      gpt_idea_id: bigint({ mode: "number" }).references(() => gptIdeas.gpt_idea_id, {
        onDelete: "cascade",
      }),
      // 좋아요를 누른 사용자 프로필 ID (UUID, profiles.profile_id 참조, 삭제 시 CASCADE)
      profile_id: uuid().references(() => profiles.profile_id, {
        onDelete: "cascade",
      }),
    },
    // 복합 기본키: (gpt_idea_id, profile_id) 한 사용자가 같은 아이디어에 중복 좋아요 불가
    (table) => [primaryKey({ columns: [table.gpt_idea_id, table.profile_id] })]
  );
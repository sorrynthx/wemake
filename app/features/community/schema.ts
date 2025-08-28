import {
  type AnyPgColumn,
  bigint,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

// 토픽(게시판) 정보를 저장하는 테이블
// - topic_id: 토픽(게시판) 고유 ID (자동 증가)
// - name: 토픽 이름
// - slug: URL 등에 사용되는 슬러그
// - created_at: 생성 일시
export const topics = pgTable("topics", {
  topic_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(), // 토픽 고유 ID
  name: text().notNull(), // 토픽 이름
  slug: text().notNull(), // 토픽 슬러그
  created_at: timestamp().notNull().defaultNow(), // 생성 일시
});

// 게시글 정보를 저장하는 테이블
// - post_id: 게시글 고유 ID (자동 증가)
// - title: 제목
// - content: 내용
// - created_at: 생성 일시
// - updated_at: 수정 일시
// - topic_id: 소속 토픽 ID (topics 테이블 참조)
// - profile_id: 작성자 프로필 ID (profiles 테이블 참조)
export const posts = pgTable("posts", {
  post_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(), // 게시글 고유 ID
  title: text().notNull(), // 제목
  content: text().notNull(), // 내용
  created_at: timestamp().notNull().defaultNow(), // 생성 일시
  updated_at: timestamp().notNull().defaultNow(), // 수정 일시
  topic_id: bigint({ mode: "number" }).references(() => topics.topic_id, {
    onDelete: "cascade",
  }), // 소속 토픽 ID
  profile_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }), // 작성자 프로필 ID
});

// 게시글 추천(업보트) 정보를 저장하는 테이블
// - post_id: 게시글 ID (posts 테이블 참조)
// - profile_id: 추천한 유저 프로필 ID (profiles 테이블 참조)
// 복합 기본키: (post_id, profile_id)
export const postUpvotes = pgTable(
  "post_upvotes",
  {
    post_id: bigint({ mode: "number" }).references(() => posts.post_id, {
      onDelete: "cascade",
    }), // 게시글 ID
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }), // 추천한 유저 프로필 ID
  },
  (table) => [primaryKey({ columns: [table.post_id, table.profile_id] })]
);

// 게시글 댓글(답글) 정보를 저장하는 테이블
// - post_reply_id: 댓글 고유 ID (자동 증가)
// - post_id: 소속 게시글 ID (posts 테이블 참조)
// - parent_id: 부모 댓글 ID (postReplies.post_reply_id 참조, null이면 최상위 댓글)
// - profile_id: 작성자 프로필 ID (profiles 테이블 참조)
// - reply: 댓글 내용
// - created_at: 생성 일시
// - updated_at: 수정 일시
export const postReplies = pgTable("post_replies", {
  post_reply_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(), // 댓글 고유 ID
  post_id: bigint({ mode: "number" }).references(() => posts.post_id, {
    onDelete: "cascade",
  }), // 소속 게시글 ID
  /**
   * 부모 댓글 ID (대댓글 구현을 위한 자기참조 컬럼)
   * - postReplies.post_reply_id를 참조함
   * - 최상위 댓글의 경우 parent_id는 null일 수 있음
   * - AnyPgColumn 타입을 사용하는 이유: 자기참조 시 타입 추론 문제를 우회하기 위함
   *   (drizzle-orm에서 자기 자신 테이블의 컬럼을 참조할 때 타입 추론이 어려워 AnyPgColumn으로 명시)
   */
  parent_id: bigint({ mode: "number" }).references(
    (): AnyPgColumn => postReplies.post_reply_id,
    {
      onDelete: "cascade",
    }
  ),
  profile_id: uuid()
    .references(() => profiles.profile_id, {
      onDelete: "cascade",
    })
    .notNull(), // 작성자 프로필 ID
  reply: text().notNull(), // 댓글 내용
  created_at: timestamp().notNull().defaultNow(), // 생성 일시
  updated_at: timestamp().notNull().defaultNow(), // 수정 일시
});
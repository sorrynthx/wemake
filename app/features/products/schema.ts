import { bigint, check, integer, jsonb, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";
import { sql } from "drizzle-orm";

// 제품 정보 테이블
export const products = pgTable("products", {
    // 제품 고유 ID (자동 증가 bigint)
    product_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    // 제품 이름 (필수)
    name: text().notNull(),
    // 제품 한 줄 설명 (필수)
    tagline: text().notNull(),
    // 제품 상세 설명 (필수)
    description: text().notNull(),
    // 제품 사용 방법 설명 (필수)
    how_it_works: text().notNull(),
    // 제품 아이콘 이미지 URL (필수)
    icon: text().notNull(),
    // 제품 웹사이트 또는 링크 (필수)
    url: text().notNull(),
    // 제품 통계 (조회수, 리뷰수) - JSONB
    stats: jsonb().notNull().default({ views: 0, reviews: 0, upvotes: 0 }),
    // 등록한 사용자 프로필 ID (users.profiles 참조, 삭제 시 cascade)
    profile_id: uuid()
        .references(() => profiles.profile_id, { onDelete: "cascade" })
        .notNull(),
    // 카테고리 ID (null 허용, 삭제 시 set null)
    category_id: bigint({ mode: "number" }).references(
        () => categories.category_id,
        { onDelete: "set null" }
    ),
    // 생성일시 (기본값: 현재시간)
    created_at: timestamp().notNull().defaultNow(),
    // 수정일시 (기본값: 현재시간)
    updated_at: timestamp().notNull().defaultNow(),
});

// 제품 카테고리 테이블
export const categories = pgTable("categories", {
    // 카테고리 고유 ID (자동 증가 bigint)
    category_id: bigint({ mode: "number" })
        .primaryKey()
        .generatedAlwaysAsIdentity(),
    // 카테고리 이름 (필수)
    name: text().notNull(),
    // 카테고리 설명 (필수)
    description: text().notNull(),
    // 생성일시
    created_at: timestamp().notNull().defaultNow(),
    // 수정일시
    updated_at: timestamp().notNull().defaultNow(),
});

// 제품 추천(Upvote) 테이블 (사용자가 제품을 추천)
export const product_upvotes = pgTable("product_upvotes", {
        // 추천받은 제품 ID (cascade 삭제)
        product_id: bigint({ mode: "number" }).references(() => products.product_id, {
            onDelete: "cascade",
        }),
        // 추천한 사용자 프로필 ID (cascade 삭제)
        profile_id: uuid().references(() => profiles.profile_id, {
            onDelete: "cascade",
        }),
    },
    // product_id + profile_id 복합 기본키 (중복 추천 방지)
    (table) => [primaryKey({ columns: [table.product_id, table.profile_id] })]
);

// 제품 리뷰 테이블
export const reviews = pgTable("reviews", {
        // 리뷰 고유 ID (자동 증가 bigint)
        review_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
        // 리뷰 대상 제품 ID (cascade 삭제)
        product_id: bigint({ mode: "number" }).references(() => products.product_id, {
            onDelete: "cascade",
        }),
        // 리뷰 작성자 프로필 ID (cascade 삭제)
        profile_id: uuid().references(() => profiles.profile_id, {
            onDelete: "cascade",
        }),
        // 리뷰 평점 (1~5 범위, check 제약 조건 적용)
        rating: integer().notNull(),
        // 리뷰 텍스트 (필수)
        review: text().notNull(),
        // 생성일시
        created_at: timestamp().notNull().defaultNow(),
        // 수정일시
        updated_at: timestamp().notNull().defaultNow(),
    },
    // rating 컬럼은 1 이상 5 이하만 허용
    (table) => [check("rating_check", sql`${table.rating} BETWEEN 1 AND 5`)]
);
/**
 * drizzle.config.ts
 * Drizzle ORM용 마이그레이션/스키마 설정 파일
 *
 * - drizzle-kit CLI가 이 파일을 읽어서 마이그레이션을 생성/실행함
 * - `drizzle-kit generate` 또는 `drizzle-kit push` 명령어에서 사용
 *
 * 주요 설정 항목:
 *  schema: 앱 내 스키마 정의 파일 경로 (Glob 패턴 허용)
 *  out: 마이그레이션 파일이 저장될 경로
 *  dialect: 사용할 DB 종류 (postgresql, mysql, sqlite 등)
 *  dbCredentials: 데이터베이스 연결 정보 (여기서는 URL만 지정)
 *
 * 참고:
 * - DATABASE_URL 환경변수가 필수 (프로덕션/개발/테스트 환경별로 달라질 수 있음)
 * - Next.js 프로젝트 구조상 app/features/'**'/schema.ts 패턴을 사용하여
 *   기능 단위로 분리된 스키마 파일을 자동 탐색하도록 설정
 *
 */

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  /**
   * 스키마 정의 파일 경로
   * - 여러 feature 단위로 나뉘어져 있을 수 있으므로 Glob 패턴 사용
   * - 예: app/features/users/schema.ts, app/features/products/schema.ts
   */
  schema: "./app/features/**/schema.ts",

  /**
   * 마이그레이션 파일이 생성될 디렉토리
   * - Git에 버전 관리하여 팀원들과 공유
   * - 예: ./app/sql/migrations/20250825_init_users.ts
   */
  out: "./app/sql/migrations",

  /**
   * 사용할 데이터베이스 종류
   * - 여기서는 PostgreSQL을 사용
   */
  dialect: "postgresql",

  /**
   * DB 연결 정보
   * - DATABASE_URL 환경변수를 통해 전달받음
   * - 보안상 절대 하드코딩하지 말 것
   *   예) postgresql://USER:PASSWORD@HOST:5432/DBNAME
   */
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
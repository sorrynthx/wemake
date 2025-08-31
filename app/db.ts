/**
 * Drizzle ORM + postgres.js 초기화 모듈
 * - 실행 환경: Node.js (Next.js / React Router SSR 등)
 * - 역할: 단일 DB 클라이언트를 만들고 Drizzle ORM 인스턴스를 구성하여 앱 전역에서 재사용
 * - 필수 환경변수: DATABASE_URL
 *   예) postgresql://USER:PASSWORD@HOST:5432/DBNAME
 *   예) postgres://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require
 *
 * 참고:
 * - Edge Runtime(Cloudflare/WinterCG 등)에서는 postgres.js가 동작하지 않으므로 Node runtime에서만 사용
 * - 개발(HMR)에서 모듈 재로드로 커넥션이 여러 개 생길 수 있음 → 필요하면 globalThis 캐싱 패턴 고려
 */
import { drizzle } from "drizzle-orm/postgres-js"; // Drizzle가 postgres.js 클라이언트를 어댑터로 받아 ORM 인스턴스를 생성
import postgres from "postgres"; // 경량 Postgres 클라이언트 (porsager/postgres)

/**
 * Low-level postgres.js 클라이언트
 * - 연결 문자열은 DATABASE_URL에서 읽음.
 * - `process.env.DATABASE_URL!`의 `!`는 "non-null assertion"으로 빌드 시 존재한다고 가정함.
 * - prepare: false → 서버 Prepared Statement를 비활성화.
 *   서버리스/짧은 수명 커넥션, 프록시, 일부 드라이버에서 재사용 이슈가 생길 수 있어 안전한 기본값으로 둠.
 *   성능이 중요하고 환경이 안정적이면 true로 전환해도 됨.
 * - 필요한 경우 여기에서 pool 크기, idleTimeout, ssl 등을 옵션으로 추가 가능.
 */
const client = postgres(process.env.DATABASE_URL!, {
  // HMR/서버리스 환경에서 prepared statement 재사용 이슈를 피하기 위한 보수적 설정
  prepare: false,
  // 예시) SSL이 필요한 환경이면 문자열에 ?sslmode=require 를 붙이거나 옵션으로 ssl: 'require' 를 줄 수 있음
  // ssl: 'require',
});

/**
 * Drizzle ORM 인스턴스
 * - `drizzle(client)`만으로도 쿼리 빌더를 사용할 수 있음.
 * - 스키마를 정적 타입으로 연결하려면 아래 주석의 형태로 구성 가능:
 *     import * as schema from "@/db/schema";
 *     const db = drizzle(client, { schema });
 */
const db = drizzle(client, { logger: true });

/**
 * 기본 내보내기
 * - 라우트 핸들러, 서비스 레이어 등에서 다음처럼 사용:
 *
 *   import db from "@/app/db";
 *   // 예시: SELECT 1
 *   // const result = await db.execute(sql`select 1 as ok`);
 *
 *   // 스키마 기반 예시:
 *   // import { users } from "@/db/schema";
 *   // const rows = await db.select().from(users).limit(10);
 */
export default db;
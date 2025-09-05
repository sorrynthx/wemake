import client from "~/supa-client";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "./constants";

// 상수에서 유효한 값들만 추출하여 타입으로 정의
type JobType = typeof JOB_TYPES[number]["value"];
type LocationType = typeof LOCATION_TYPES[number]["value"];
type SalaryRange = typeof SALARY_RANGE[number];

export const getJobs = async ({
  limit,
  location,
  type,
  salary,
}: {
  limit: number;
  location?: LocationType;
  type?: JobType;
  salary?: SalaryRange;
}) => {
  const baseQuery = client
    .from("jobs")
    .select(
      `
    job_id,
    position,
    overview,
    company_name,
    company_logo,
    company_location,
    job_type,
    location,
    salary_range,
    created_at
    `
    )
    .limit(limit);
  if (location) {
    baseQuery.eq("location", location);
  }
  if (type) {
    baseQuery.eq("job_type", type);
  }
  if (salary) {
    baseQuery.eq("salary_range", salary);
  }
  const { data, error } = await baseQuery;
  if (error) {
    throw error;
  }
  return data;
};
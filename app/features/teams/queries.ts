import client from "~/supa-client";

export const getTeams = async ({ limit }: { limit: number }) => {
  const { data, error } = await client
    .from("teams")
    .select(
      `
    team_id,
    roles,
    product_description,
    team_leader:profiles!inner(
      username,
      avatar
    )
    `
    )
    .limit(limit);

  if (error) {
    throw error;
  }

  return data;
};

export const getTeamById = async (teamId: string) => {
  const { data, error } = await client
    .from("teams")
    .select(
      `
      *,
      team_leader:profiles!inner(
        name,
        avatar,
        role
      )
      `
    )
    // team_id는 number 타입이므로, string 타입의 teamId를 number로 변환해야 함
    // Supabase 쿼리에서 타입 불일치로 인한 오류를 방지하기 위함
    .eq("team_id", Number(teamId))
    .single();
  // 에러가 발생하면 예외를 throw하여 상위에서 처리할 수 있도록 함
  if (error) throw error;
  // 정상적으로 데이터를 반환
  return data;
};
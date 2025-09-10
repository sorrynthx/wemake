import pkg from "@supabase/supabase-js";
const { SupabaseClient } = pkg;
import type { Database } from "~/supa-client";

type SupabaseClientType = InstanceType<typeof SupabaseClient<Database>>;

export const getTeams = async (
  client: SupabaseClientType,
  { limit }: { limit: number }
) => {
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

export const getTeamById = async (
  client: SupabaseClientType,
  { teamId }: { teamId: string }
) => {
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
    .eq("team_id", Number(teamId))
    .single();
  if (error) throw error;
  return data;
};
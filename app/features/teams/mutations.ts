import pkg from "@supabase/supabase-js";
const { SupabaseClient } = pkg;
import { z } from "zod";
import type { Database } from "~/supa-client";
import { formSchema } from "./pages/submit-team-page";

type SupabaseClientType = InstanceType<typeof SupabaseClient<Database>>;

export const createTeam = async (
  client: SupabaseClientType,
  userId: string,
  team: z.infer<typeof formSchema>
) => {
  const { data, error } = await client
    .from("teams")
    .insert({
      team_leader_id: userId,
      team_size: team.size,
      product_name: team.name,
      product_stage: team.stage as "idea" | "prototype" | "mvp" | "product",
      product_description: team.description,
      roles: team.roles,
      equity_split: team.equity,
    })
    .select("team_id")
    .single();
  if (error) {
    throw error;
  }
  return data;
};
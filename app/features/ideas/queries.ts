import pkg from "@supabase/supabase-js";
const { SupabaseClient } = pkg;
import type { Database } from "~/supa-client";

type SupabaseClientType = InstanceType<typeof SupabaseClient<Database>>;

export const getGptIdeas = async (
  client: SupabaseClientType,
  { limit }: { limit: number }
) => {
  const { data, error } = await client
    .from("gpt_ideas_view")
    .select("*")
    .limit(limit);
  if (error) {
    throw error;
  }
  return data;
};

export const getGptIdea = async (
  client: SupabaseClientType,
  { ideaId }: { ideaId: string }
) => {
  const { data, error } = await client
    .from("gpt_ideas_view")
    .select("*")
    .eq("gpt_idea_id", Number(ideaId))
    .single();
  if (error) {
    throw error;
  }
  return data;
};
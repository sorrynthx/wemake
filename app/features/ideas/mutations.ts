import pkg from "@supabase/supabase-js";
const { SupabaseClient } = pkg;
import type { Database } from "~/supa-client";

type SupabaseClientType = InstanceType<typeof SupabaseClient<Database>>;

export const claimIdea = async (
  client: SupabaseClientType,
  { ideaId, userId }: { ideaId: string; userId: string }
) => {
  const { error } = await client
    .from("gpt_ideas")
    .update({ claimed_by: userId, claimed_at: new Date().toISOString() })
    .eq("gpt_idea_id", Number(ideaId));
  if (error) {
    throw error;
  }
};
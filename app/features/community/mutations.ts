import pkg from "@supabase/supabase-js";
const { SupabaseClient } = pkg;
import type { Database } from "~/supa-client";

type SupabaseClientType = InstanceType<typeof SupabaseClient<Database>>;

export const createPost = async (
  client: SupabaseClientType,
  {
    title,
    category,
    content,
    userId,
  }: {
    title: string;
    category: string;
    content: string;
    userId: string;
  }
) => {
  const { data: categoryData, error: categoryError } = await client
    .from("topics")
    .select("topic_id")
    .eq("slug", category)
    .single();
  if (categoryError) {
    throw categoryError;
  }
  const { data, error } = await client
    .from("posts")
    .insert({
      title,
      content,
      profile_id: userId,
      topic_id: categoryData.topic_id,
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const createReply = async (
  client: SupabaseClientType,
  {
    postId,
    reply,
    userId,
    topLevelId,
  }: { postId: string; reply: string; userId: string; topLevelId?: number }
) => {
  const { error } = await client.from("post_replies").insert({
    ...(topLevelId ? { parent_id: topLevelId } : { post_id: Number(postId) }),
    reply,
    profile_id: userId,
  });
  if (error) {
    throw error;
  }
};
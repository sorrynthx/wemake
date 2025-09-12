import pkg from "@supabase/supabase-js";
const { SupabaseClient } = pkg;
import { DateTime } from "luxon";
import type { Database } from "~/supa-client";

type SupabaseClientType = InstanceType<typeof SupabaseClient<Database>>;

export const getTopics = async (client: SupabaseClientType) => {
  const { data, error } = await client.from("topics").select("name, slug");
  if (error) throw new Error(error.message);
  return data;
};

export const getPosts = async (
  client: SupabaseClientType,
  {
    limit,
    sorting,
    period = "all",
    keyword,
    topic,
  }: {
    limit: number;
    sorting: "newest" | "popular";
    period?: "all" | "today" | "week" | "month" | "year";
    keyword?: string;
    topic?: string;
  }
) => {
  const baseQuery = client
    .from("community_post_list_view")
    .select(`*`)
    .limit(limit);
  if (sorting === "newest") {
    baseQuery.order("created_at", { ascending: false });
  } else if (sorting === "popular") {
    if (period === "all") {
      baseQuery.order("upvotes", { ascending: false });
    } else {
      const today = DateTime.now();
      if (period === "today") {
        baseQuery.gte("created_at", today.startOf("day").toISO());
      } else if (period === "week") {
        baseQuery.gte("created_at", today.startOf("week").toISO());
      } else if (period === "month") {
        baseQuery.gte("created_at", today.startOf("month").toISO());
      } else if (period === "year") {
        baseQuery.gte("created_at", today.startOf("year").toISO());
      }
      baseQuery.order("upvotes", { ascending: false });
    }
  }

  if (keyword) {
    baseQuery.ilike("title", `%${keyword}%`);
  }

  if (topic) {
    baseQuery.eq("topic_slug", topic);
  }

  const { data, error } = await baseQuery;
  if (error) throw new Error(error.message);
  return data;
};

export const getPostById = async (
  client: SupabaseClientType,
  { postId }: { postId: string }
) => {
  const numericPostId = Number(postId);
  if (isNaN(numericPostId)) {
    throw new Error(`Invalid postId: ${postId} is not a valid number`);
  }
  
  const { data, error } = await client
    .from("community_post_detail")
    .select("*")
    .eq("post_id", numericPostId)
    .single();
  if (error) throw error;
  return data;
};

export const getReplies = async (
  client: SupabaseClientType,
  { postId }: { postId: string }
) => {
  const numericPostId = Number(postId);
  if (isNaN(numericPostId)) {
    throw new Error(`Invalid postId: ${postId} is not a valid number`);
  }
  
  const replyQuery = `
    post_reply_id,
    reply,
    created_at,
    user:profiles (
      name,
      avatar,
      username
    )
  `;
  const { data, error } = await client
    .from("post_replies")
    .select(
      `
      ${replyQuery},
      post_replies (
        ${replyQuery}
      )
      `
    )
    .eq("post_id", numericPostId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};
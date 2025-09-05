import client from "~/supa-client";

export const getGptIdeas = async ({ limit }: { limit: number }) => {
  const { data, error } = await client
    .from("gpt_ideas_view")
    .select("*")
    .limit(limit);
  if (error) {
    throw error;
  }
  return data;
};

export const getGptIdea = async (ideaId: string) => {
  const { data, error } = await client
    .from("gpt_ideas_view")
    .select("*")
    // gpt_idea_id는 number 타입이므로, ideaId를 number로 변환하여 쿼리합니다.
    // 변환에 실패할 경우 NaN이 되어 쿼리가 실패할 수 있으니, 사전에 ideaId의 유효성을 검증하는 것이 좋습니다.
    .eq("gpt_idea_id", Number(ideaId))
    .single();
  if (error) {
    throw error;
  }
  return data;
};
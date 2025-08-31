import client from "~/supa-client";

export const getTopics = async () => {
  //await new Promise((resolve) => setTimeout(resolve, 4000));  
  const { data, error } = await client.from("topics").select("name, slug");
    if (error) throw new Error(error.message);
    return data;
  };
  
  export const getPosts = async () => {
    //await new Promise((resolve) => setTimeout(resolve, 4000));
    const { data, error } = await client
      .from("community_post_list_view")
      .select(`*`);
    if (error) throw new Error(error.message);
    return data;
  };
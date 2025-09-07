import { DateTime } from "luxon";
import client from "~/supa-client";
import { PAGE_SIZE } from "./contants";

export const productListSelect = `
product_id,
name,
tagline,
upvotes:stats->>upvotes,
views:stats->>views,
reviews:stats->>reviews
`;

export const getProductsByDateRange = async ({
  startDate,
  endDate,
  limit,
  page = 1,
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit: number;
  page?: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    .order("stats->>upvotes", { ascending: false })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO())
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) throw error;
  return data;
};

export const getProductPagesByDateRange = async ({
  startDate,
  endDate,
}: {
  startDate: DateTime;
  endDate: DateTime;
}) => {
  const { count, error } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO());
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};

export const getCategories = async () => {
  const { data, error } = await client
    .from("categories")
    .select("category_id, name, description");
  if (error) throw error;
  return data;
};

export const getCategory = async (categoryId: number) => {
  const { data, error } = await client
    .from("categories")
    .select("category_id, name, description")
    .eq("category_id", categoryId)
    .single();
  if (error) throw error;
  return data;
};

export const getProductsByCategory = async ({
  categoryId,
  page,
}: {
  categoryId: number;
  page: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    .eq("category_id", categoryId)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) throw error;
  return data;
};

export const getCategoryPages = async (categoryId: number) => {
  const { count, error } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .eq("category_id", categoryId);
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};

export const getProductsBySearch = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    .or(`name.ilike.%${query}%, tagline.ilike.%${query}%`)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) throw error;
  return data;
};

export const getPagesBySearch = async ({ query }: { query: string }) => {
  const { count, error } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .or(`name.ilike.%${query}%, tagline.ilike.%${query}%`);
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};

export const getProductById = async (productId: string) => {
    // Supabase 쿼리에서 product_id는 number 타입이어야 하므로, productId를 number로 변환합니다.
    // 만약 변환이 실패하면 에러를 발생시켜 잘못된 입력을 조기에 감지합니다.
    const numericProductId = Number(productId);
    if (Number.isNaN(numericProductId)) {
      // productId가 숫자로 변환 불가할 때 상세한 에러 메시지와 함께 예외를 발생시킵니다.
      throw new Error("productId는 숫자여야 합니다.");
    }

    // product_overview_view에서 product_id가 일치하는 단일 상품 정보를 조회합니다.
    // .single()을 사용하여 결과가 1개임을 보장하고, 에러 발생 시 예외를 던집니다.
    const { data, error } = await client
      .from("product_overview_view")
      .select("*")
      .eq("product_id", numericProductId)
      .single();
    if (error) throw error;
    // 조회된 상품 데이터를 반환합니다.
    return data;
};

export const getReviews = async (productId: string) => {
  
  const numericProductId = Number(productId);
    if (Number.isNaN(numericProductId)) {
      // productId가 숫자로 변환 불가할 때 상세한 에러 메시지와 함께 예외를 발생시킵니다.
      throw new Error("productId는 숫자여야 합니다.");
    }

  const { data, error } = await client
    .from("reviews")
    .select(
      `
        review_id,
        rating,
        review,
        created_at,
        user:profiles!inner(
          name,username,avatar
        )
      `
    )
    .eq("product_id", numericProductId);
  if (error) throw error;
  return data;
};
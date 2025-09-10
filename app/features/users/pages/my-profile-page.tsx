import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";
import { getUserById } from "../queries";
import type { Route } from "./+types/my-profile-page";

export async function loader({ request }: Route.LoaderArgs) {
  console.log('my-profile-page loader 시작');
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  
  console.log('사용자 정보:', user ? '로그인됨' : '로그인 안됨');
  
  if (user) {
    try {
      console.log('프로필 조회 시도 중...');
      const profile = await getUserById(client, { id: user.id });
      console.log('프로필 조회 성공:', profile);
      
      // URL 안전성을 위해 username을 인코딩
      const safeUsername = encodeURIComponent(profile.username);
      console.log('원본 username:', profile.username);
      console.log('인코딩된 safeUsername:', safeUsername);
      console.log('리다이렉트할 URL:', `/users/${safeUsername}`);
      
      // 리다이렉트 대신 Response 객체 직접 반환
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/users/${safeUsername}`
        }
      });
    } catch (error) {
      // 프로필이 없는 경우 로그인 페이지로 리다이렉트
      console.error('프로필 조회 실패:', error);
      return redirect("/auth/login");
    }
  }
  console.log('사용자가 로그인되지 않음, 로그인 페이지로 리다이렉트');
  return redirect("/auth/login");
}
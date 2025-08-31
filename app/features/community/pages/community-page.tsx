import type { Route } from "./+types/community-page";
// Await: Promise(비동기 값)를 컴포넌트 트리에서 해석해 주는 react-router 유틸
import { Await, Form, Link, useSearchParams } from "react-router";
import { Button } from "~/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { PERIOD_OPTIONS, SORT_OPTIONS } from "../constants";
import { Input } from "~/common/components/ui/input";
import { PostCard } from "../components/post-card";
import { getPosts, getTopics } from "../queries";
import { HeroSection } from "~/common/components/hero-section";
import { Suspense } from "react";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Community | wemake" }];
};

// 🔹 loader (서버 전용)
// - Remix/React Router에서 제공하는 표준 함수 이름 (커스텀 불가, 예약됨)
// - 서버에서 실행되어 데이터 fetching, 인증, redirect 등의 로직을 처리
// - 여기서는 getTopics(), getPosts()를 동시에 호출하여 초기 데이터(topics, posts)를 준비
// - 반환된 데이터는 컴포넌트의 loaderData로 전달됨
export const loader = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const [topics, posts] = await Promise.all([getTopics(), getPosts()]);
  return { topics, posts };
};

// 🔹 clientLoader (클라이언트 전용)
// - Remix/React Router에서 제공하는 표준 함수 이름 (커스텀 불가, 예약됨)
// - 클라이언트에서 실행되며, serverLoader의 데이터를 받아서 추가 처리 가능
// - 예: analytics 트래킹, 클라이언트 전용 상태 초기화 등
// - 여기서는 serverLoader 결과를 기반으로 추후 확장 가능
export const clientLoader = async ({ serverLoader,}: Route.ClientLoaderArgs) => {
  //track analytics
};

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  
  const { topics, posts } = loaderData;

  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  const period = searchParams.get("period") || "all";
  return (
    <div className="space-y-20">
      <HeroSection
        title="Community"
        subtitle="Ask questions, share ideas, and connect with other developers"
      />
      <div className="grid grid-cols-6 items-start gap-40">
        <div className="col-span-4 space-y-10">
          <div className="flex justify-between">
            <div className="space-y-5 w-full">
              <div className="flex items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <span className="text-sm capitalize">{sorting}</span>
                    <ChevronDownIcon className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem
                        className="capitalize cursor-pointer"
                        key={option}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            searchParams.set("sorting", option);
                            setSearchParams(searchParams);
                          }
                        }}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sorting === "popular" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <span className="text-sm capitalize">{period}</span>
                      <ChevronDownIcon className="size-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PERIOD_OPTIONS.map((option) => (
                        <DropdownMenuCheckboxItem
                          className="capitalize cursor-pointer"
                          key={option}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              searchParams.set("period", option);
                              setSearchParams(searchParams);
                            }
                          }}
                        >
                          {option}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <Form className="w-2/3">
                <Input
                  type="text"
                  name="search"
                  placeholder="Search for discussions"
                />
              </Form>
            </div>
            <Button asChild>
              <Link to={`/community/submit`}>Create Discussion</Link>
            </Button>
          </div>
          
            <div className="space-y-5">
              {/* data는 posts가 resolve된 실제 배열 값 (fulfilled 결과) */}
              {posts.map((post) => (
                <PostCard
                  key={post.post_id}
                  id={post.post_id}
                  title={post.title}
                  author={post.author}
                  authorAvatarUrl={post.author_avatar}
                  category={post.topic}
                  postedAt={post.created_at}
                  votesCount={post.upvotes}
                  expanded
                />
              ))}
            </div>
              
        </div>
        <aside className="col-span-2 space-y-5">
          <span className="text-sm font-bold text-muted-foreground uppercase">
            Topics
          </span>
          <div className="flex flex-col gap-2 items-start">
            {topics.map((topic) => (
              <Button
                asChild
                variant={"link"}
                key={topic.slug}
                className="pl-0"
              >
                <Link to={`/community?topic=${topic.slug}`}>{topic.name}</Link>
              </Button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
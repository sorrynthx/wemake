import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb"; // 네비게이션용 Breadcrumb 컴포넌트
import type { Route } from "./+types/post-page"; // meta 함수용 Route 타입
import { Form, Link } from "react-router"; // react-router의 Form, Link 컴포넌트
import { ChevronUpIcon, DotIcon, MessageCircleIcon } from "lucide-react"; // 페이지에 사용되는 아이콘
import { Button } from "~/common/components/ui/button"; // 버튼 컴포넌트
import { Textarea } from "~/common/components/ui/textarea"; // 텍스트 영역 컴포넌트
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar"; // 아바타 관련 컴포넌트
import { Badge } from "~/common/components/ui/badge"; // 배지 컴포넌트
import { Reply } from "~/features/community/components/reply"; // 댓글용 Reply 컴포넌트

// meta 함수: 페이지 메타데이터 설정
export const meta: Route.MetaFunction = ({ params }) => {
  return [{ title: `${params.postId} | wemake` }];
};

export default function PostPage() {
  return (
    <div className="space-y-10">
      {/* Breadcrumb: 페이지 경로 */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community?topic=productivity">Productivity</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community/postId">
                What is the best productivity tool?
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* 그리드 레이아웃: 메인 콘텐츠와 사이드바 */}
      <div className="grid grid-cols-6 gap-40 items-start">
        {/* 메인 콘텐츠 영역 */}
        <div className="col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            {/* 투표 버튼 */}
            <Button variant="outline" className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>10</span>
            </Button>

            <div className="space-y-20">
              {/* 게시글 제목, 메타정보, 내용 */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">
                  What is the best productivity tool?
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>@nico</span>
                  <DotIcon className="size-5" />
                  <span>12 hours ago</span>
                  <DotIcon className="size-5" />
                  <span>10 replies</span>
                </div>
                <p className="text-muted-foreground w-3/4">
                  Hello, I'm looking for a productivity tool that can help me
                  manage my tasks and projects. Any recommendations? I have
                  tried Notion, but it's not what I'm looking for. I dream of a
                  tool that can help me manage my tasks and projects. Any
                  recommendations?
                </p>
              </div>

              {/* 댓글 작성 폼 */}
              <Form className="flex items-start gap-5 w-3/4">
                <Avatar className="size-14">
                  <AvatarFallback>N</AvatarFallback>
                  <AvatarImage src="https://github.com/apple.png" />
                </Avatar>
                <div className="flex flex-col gap-5 items-end w-full">
                  <Textarea
                    placeholder="Write a reply"
                    className="w-full resize-none"
                    rows={5}
                  />
                  <Button>Reply</Button>
                </div>
              </Form>

              {/* 댓글 목록 */}
              <div className="space-y-10">
                <h4 className="font-semibold">10 Replies</h4>
                <div className="flex flex-col gap-5">
                  <Reply
                    username="Nicolas"
                    avatarUrl="https://github.com/microsoft.png"
                    content="I've been using Todoist for a while now, and it's really great. It's simple, easy to use, and has a lot of features."
                    timestamp="12 hours ago"
                    topLevel
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 사이드바 영역 */}
        <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
          {/* 작성자 정보: 아바타와 배지 */}
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>S</AvatarFallback>
              <AvatarImage src="https://github.com/sorrynthx.png" />
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">Sorrynthx</h4>
              <Badge variant="secondary">Entrepreneur</Badge>
            </div>
          </div>

          {/* 작성자 활동 정보 */}
          <div className="gap-2 text-sm flex flex-col">
            <span>🎂 Joined 3 months ago</span>
            <span>🚀 Launched 10 products</span>
          </div>

          {/* 팔로우 버튼 */}
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
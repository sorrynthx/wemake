import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { StarIcon } from "lucide-react";

interface ReviewCardProps {
  author: {
    name: string;
    username: string;
    avatarUrl?: string;
    avatarFallback: string;
  };
  rating: number;
  content: string;
  createdAt: string;
}

export function ReviewCard({ author, rating, content, createdAt }: ReviewCardProps) {
  return (
    <div className="space-y-5">
      {/* Author Information */}
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{author.avatarFallback}</AvatarFallback>
          {author.avatarUrl && <AvatarImage src={author.avatarUrl} />}
        </Avatar>
        <div>
          <h4 className="text-lg font-bold">{author.name}</h4>
          <p className="text-sm text-muted-foreground">
            @{author.username}
          </p>
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex text-yellow-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon 
            key={index}
            className="size-4" 
            fill={index < rating ? "currentColor" : "none"}
            stroke="currentColor"
          />
        ))}
      </div>

      {/* Review Content */}
      <p className="text-muted-foreground">
        {content}
      </p>

      {/* Creation Date */}
      <span className="text-xs text-muted-foreground">{createdAt}</span>
    </div>
  );
}

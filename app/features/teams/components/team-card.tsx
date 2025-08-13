import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";

interface TeamCardProps {
  teamId: string;
  leaderUsername: string;
  leaderAvatarUrl: string;
  leaderAvatarFallback: string;
  positions: string[];
  projectDescription: string;
}

export function TeamCard({ 
  teamId, 
  leaderUsername, 
  leaderAvatarUrl, 
  leaderAvatarFallback, 
  positions, 
  projectDescription 
}: TeamCardProps) {
  return (
    <Link to={`/teams/${teamId}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-base leading-loose">
            <Badge variant="secondary" className="inline-flex shadow-sm items-center text-base">
              <span>@{leaderUsername}</span>
              <Avatar className="size-5">
                <AvatarFallback>{leaderAvatarFallback}</AvatarFallback>
                <AvatarImage src={leaderAvatarUrl} />
              </Avatar>
            </Badge>
            <span> is looking for </span>
            {positions.map((position, index) => (
              <Badge key={index} className="text-base ml-1">
                {position}
              </Badge>
            ))}
            <span> to build </span>
            <span>{projectDescription}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button variant="link">Join Team 💸 &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";

interface JobCardProps {
  jobId: string;
  companyName: string;
  companyLogoUrl: string;
  jobTitle: string;
  timeAgo: string;
  employmentType: string;
  location: string;
  salary: string;
  city: string;
}

export function JobCard({ 
  jobId, 
  companyName, 
  companyLogoUrl, 
  jobTitle, 
  timeAgo, 
  employmentType, 
  location, 
  salary, 
  city 
}: JobCardProps) {
  return (
    <Link to={`/jobs/${jobId}`}>
      <Card className="bg-transparent transition-colors hover:bg-card/50">
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={companyLogoUrl}
              alt={`${companyName} Logo`}
              className="size-10 rounded-full"
            />
            <div className="space-x-2">
              <span className="text-accent-foreground">{companyName}</span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>
          </div>
          <CardTitle>{jobTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline">{employmentType}</Badge>
          <Badge variant="outline">{location}</Badge> 
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              {salary}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {city}
            </span>
          </div>
          <Button variant="secondary" size="sm">Apply now</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

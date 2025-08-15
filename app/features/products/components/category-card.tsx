import { Card, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  to: string;
}

export function CategoryCard({ id, name, description, to }: CategoryCardProps) {
  return (
    <Link to={to} className="block">
      <Card>
        <CardHeader>
          <CardTitle className="flex">
            {name} <ChevronRightIcon className="size-8" />
          </CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>          
      </Card>
    </Link>
  );
}

import type { Route } from "./+types/notifications-page";
import { NotificationCard } from "../components/notification-card";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Notifications | wemake" }];
};

export default function NotificationsPage() {
  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col items-start gap-5">
        <NotificationCard
          avatarUrl="https://github.com/sorrynthx.png"
          avatarFallback="S"
          userName="Sorrynthx"
          message=" followed you."
          timestamp="3 days ago"
          seen={false}
        />

        <NotificationCard
          avatarUrl="https://github.com/facebook.png"
          avatarFallback="F"
          userName="META"
          message=" followed you."
          timestamp="1 days ago"
          seen={true}
        />
      </div>
    </div>
  );
}
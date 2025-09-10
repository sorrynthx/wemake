import { useOutletContext } from "react-router";

import client from "~/supa-client";
import type { Route } from "./+types/profile-page";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  // URL 인코딩된 username을 디코딩
  const decodedUsername = decodeURIComponent(params.username);
  await client.rpc("track_event", {
    event_type: "profile_view",
    event_data: {
      username: decodedUsername,
    },
  });
  return null;
};

export default function ProfilePage() {
  const { headline, bio } = useOutletContext<{
    headline: string;
    bio: string;
  }>();
  return (
    <div className="max-w-screen-md flex flex-col space-y-10">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">{headline}</p>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Bio</h4>
        <p className="text-muted-foreground">{bio}</p>
      </div>
    </div>
  );
}
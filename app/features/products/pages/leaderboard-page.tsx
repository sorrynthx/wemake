import type { Route } from "../../../+types/products/leaderboards";

export function loader({ request }: Route.LoaderArgs) {
  return {
    leaderboards: [],
    timeframes: ["daily", "weekly", "monthly", "yearly"]
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export function meta(): Route.MetaFunction {
  return [
    { title: "Product Leaderboards - WeMake" },
    { name: "description", content: "Top products ranked by popularity and engagement" }
  ];
}

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
  const { leaderboards, timeframes } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Leaderboards</h1>
        <p className="text-lg text-gray-600">
          Discover the most popular products across different timeframes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {timeframes.map((timeframe) => (
          <a
            key={timeframe}
            href={`/products/leaderboards/${timeframe}`}
            className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold capitalize mb-2">{timeframe}</h3>
            <p className="text-gray-600">View {timeframe} rankings</p>
          </a>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Current Rankings</h2>
        <div className="space-y-4">
          {leaderboards.map((item: any, index: number) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="text-2xl font-bold text-gray-400 w-8">{index + 1}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-blue-600">{item.score}</div>
                <div className="text-sm text-gray-500">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

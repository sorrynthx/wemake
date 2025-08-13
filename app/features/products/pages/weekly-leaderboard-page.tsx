import type { Route } from "../../../+types/products/leaderboards/weekly.$year.$week";

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, week } = params;
  
  // Calculate the start and end dates for the week
  const startDate = new Date(parseInt(year), 0, 1 + (parseInt(week) - 1) * 7);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return {
    year,
    week,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    leaderboards: [],
    weekOptions: Array.from({ length: 52 }, (_, i) => i + 1)
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export function meta({ params }: Route.MetaFunction) {
  const { year, week } = params;
  return [
    { title: `Week ${week}, ${year} Product Leaderboard - WeMake` },
    { name: "description", content: `Top products of week ${week}, ${year} ranked by popularity and engagement` }
  ];
}

export default function WeeklyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const { year, week, startDate, endDate, leaderboards, weekOptions } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-gray-900">Week {week}, {year} Product Leaderboard</h1>
          <div className="flex space-x-2">
            <select 
              className="border border-gray-300 rounded-md px-4 py-2"
              defaultValue={week}
              onChange={(e) => {
                window.location.href = `/products/leaderboards/weekly/${year}/${e.target.value}`;
              }}
            >
              {weekOptions.map((weekOption) => (
                <option key={weekOption} value={weekOption}>
                  Week {weekOption}
                </option>
              ))}
            </select>
            <select 
              className="border border-gray-300 rounded-md px-4 py-2"
              defaultValue={year}
              onChange={(e) => {
                window.location.href = `/products/leaderboards/weekly/${e.target.value}/${week}`;
              }}
            >
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-lg text-gray-600">
          Top products of week {week}, {year} ({startDate} - {endDate}) ranked by popularity and engagement
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Weekly Rankings</h2>
        <div className="space-y-4">
          {leaderboards.map((item: any, index: number) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="text-2xl font-bold text-gray-400 w-8">{index + 1}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                  <span>Category: {item.category}</span>
                  <span>Weekly Growth: {item.weeklyGrowth}%</span>
                </div>
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

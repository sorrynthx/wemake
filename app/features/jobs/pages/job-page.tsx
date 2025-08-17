import type { Route } from "../../../+types/jobs";

export function loader({ request, params }: Route.LoaderArgs) {
  // TODO: Implement loader logic
  return {};
}

export function action({ request }: Route.ActionArgs) {
  // TODO: Implement action logic
  return {};
}

export function meta(): Route.MetaFunction {
  return [
    { title: "Job Details - WeMake" },
    { name: "description", content: "View job details and apply" },
  ];
}

export default function JobPage({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Title</h1>
          <p className="text-gray-600 mt-2">Company Name</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="ml-2 text-gray-600">Remote / On-site</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <span className="ml-2 text-gray-600">Full-time</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Salary:</span>
                  <span className="ml-2 text-gray-600">$XX,XXX - $XX,XXX</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Company</h2>
              <p className="text-gray-600">Company description will go here</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600">Job description content will be displayed here...</p>
          </div>
          
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Apply for this job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

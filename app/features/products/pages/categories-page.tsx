import type { Route } from "../../../+types/products/categories";

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [
      { id: 1, name: "Productivity", count: 45, description: "Tools to boost your productivity" },
      { id: 2, name: "Design", count: 32, description: "Design tools and resources" },
      { id: 3, name: "Development", count: 67, description: "Development tools and libraries" },
      { id: 4, name: "Marketing", count: 28, description: "Marketing and growth tools" },
      { id: 5, name: "Analytics", count: 23, description: "Data and analytics tools" },
      { id: 6, name: "Communication", count: 19, description: "Communication and collaboration tools" }
    ]
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export function meta(): Route.MetaFunction {
  return [
    { title: "Product Categories - WeMake" },
    { name: "description", content: "Browse products by category" }
  ];
}

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Categories</h1>
        <p className="text-lg text-gray-600">
          Browse products organized by category to find exactly what you need
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`/products/categories/${category.name.toLowerCase()}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {category.count}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="flex items-center text-blue-600 hover:text-blue-800">
              <span>Browse category</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't find what you're looking for?</h2>
        <p className="text-gray-600 mb-6">
          Browse all products or submit a request for a new category
        </p>
        <div className="flex space-x-4 justify-center">
          <a
            href="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse All Products
          </a>
          <a
            href="/products/submit"
            className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
          >
            Submit Product
          </a>
        </div>
      </div>
    </div>
  );
}

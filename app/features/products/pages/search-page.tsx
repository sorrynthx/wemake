import type { Route } from "../../../+types/products/search";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  
  // Mock search results - in real app this would come from API
  const searchResults = query ? [
    {
      id: 1,
      name: "Product One",
      description: "A fantastic tool for boosting productivity",
      category: "Productivity",
      rating: 4.5,
      votes: 128
    },
    {
      id: 2,
      name: "Product Two",
      description: "Another great tool in this category",
      category: "Design",
      rating: 4.2,
      votes: 95
    }
  ] : [];
  
  return {
    query,
    results: searchResults,
    totalResults: searchResults.length,
    suggestions: ["productivity", "design", "development", "marketing"]
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export function meta(): Route.MetaFunction {
  return [
    { title: "Search Products - WeMake" },
    { name: "description", content: "Search for amazing products and tools" }
  ];
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const { query, results, totalResults, suggestions } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Search Products</h1>
        <p className="text-lg text-gray-600">
          Find the perfect tool for your needs
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <form method="get" className="relative">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search for products, tools, or categories..."
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {query && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Search Results for "{query}"
            </h2>
            <span className="text-gray-600">{totalResults} results found</span>
          </div>
        </div>
      )}

      {!query && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <a
                key={suggestion}
                href={`/products/search?q=${encodeURIComponent(suggestion)}`}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition-colors"
              >
                {suggestion}
              </a>
            ))}
          </div>
        </div>
      )}

      {query && results.length > 0 && (
        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                  {result.category}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm text-gray-600">{result.rating}</span>
                  <span className="ml-1 text-xs text-gray-500">({result.votes})</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.name}</h3>
              <p className="text-gray-600 mb-4">{result.description}</p>
              
              <div className="flex justify-between items-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  View Details
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any products matching "{query}". Try different keywords or browse our categories.
          </p>
          <div className="flex space-x-4 justify-center">
            <a
              href="/products/categories"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Categories
            </a>
            <a
              href="/products"
              className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              View All Products
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

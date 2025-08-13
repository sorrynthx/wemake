import type { Route } from "../../../+types/products/categories/$category";

export function loader({ request, params }: Route.LoaderArgs) {
  const { category } = params;
  
  // Mock data - in real app this would come from API
  const categoryData = {
    name: category.charAt(0).toUpperCase() + category.slice(1),
    description: `Discover amazing ${category} tools and products`,
    products: [
      {
        id: 1,
        name: "Product One",
        description: "A fantastic tool for boosting productivity",
        image: "/placeholder.jpg",
        rating: 4.5,
        votes: 128,
        category: category
      },
      {
        id: 2,
        name: "Product Two",
        description: "Another great tool in this category",
        image: "/placeholder.jpg",
        rating: 4.2,
        votes: 95,
        category: category
      }
    ]
  };
  
  return {
    category: categoryData.name,
    description: categoryData.description,
    products: categoryData.products
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export function meta({ params }: Route.MetaFunction) {
  const { category } = params;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  return [
    { title: `${categoryName} Products - WeMake` },
    { name: "description", content: `Discover amazing ${categoryName.toLowerCase()} tools and products` }
  ];
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  const { category, description, products } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/products" className="hover:text-gray-700">Products</a>
          <span className="mx-2">/</span>
          <a href="/products/categories" className="hover:text-gray-700">Categories</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{category}</span>
        </nav>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{category} Products</h1>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            {products.length} products found
          </h2>
          <div className="flex space-x-2">
            <select className="border border-gray-300 rounded-md px-3 py-2">
              <option>Sort by: Popularity</option>
              <option>Sort by: Rating</option>
              <option>Sort by: Newest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                  {product.category}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  <span className="ml-1 text-xs text-gray-500">({product.votes})</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
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
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">This category doesn't have any products yet.</p>
          <a
            href="/products/submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit a Product
          </a>
        </div>
      )}
    </div>
  );
}

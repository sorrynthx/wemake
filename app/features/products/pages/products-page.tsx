import type { Route } from "../../../+types/products";

export function loader({ request }: Route.LoaderArgs) {
  return {
    products: [],
    categories: []
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export function meta(): Route.MetaFunction {
  return [
    { title: "Products - WeMake" },
    { name: "description", content: "Discover amazing products and tools" }
  ];
}

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  const { products, categories } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Products</h1>
        <p className="text-lg text-gray-600">
          Discover amazing products and tools from the community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{product.category}</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

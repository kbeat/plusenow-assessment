import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Product } from "@/types/Product";
import { api } from "@/services/api";
import { formatPrice } from "@/utils/format";
import { buildQuery } from "@/utils/query";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // filters
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [filters, setFilters] = useState({});

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const query = buildQuery({
        search,
        minPrice,
        maxPrice,
      });

      const res = await api.get<Product[]>(`/products?${query}`);
      setProducts(res.data.products);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setFilters({
      search,
      minPrice,
      maxPrice,
    });
  };

  // refresh on filters change
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <div>
      <div className="text-3xl">Products</div>
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="text-center mt-10 text-red-500 font-medium">
          {error}
        </div>
      )}
      {!loading && !error && (
        <div>
          <div className="flex flex-col md:flex-row gap-2 my-4">
            <input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <input
              type="number"
              placeholder="Min price"
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <input
              type="number"
              placeholder="Max price"
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />

            <button
              onClick={applyFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Apply Filters
            </button>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <Link to={`/products/${p.id}`} key={p.id}>
                <div className="border rounded-xl shadow-sm bg-white p-4 hover:shadow-md transition">
                  {/* Image */}
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  {/* Name */}
                  <h3 className="mt-3 text-lg font-semibold text-gray-800">
                    {p.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mt-1">
                    {/* Stars */}
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium">{p.rating}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({p.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-2 flex items-center gap-2">
                    {/* New price */}
                    <p className="text-blue-600 font-semibold text-lg">
                      ${formatPrice(p.price)}
                    </p>

                    {/* Old price if discounted */}
                    {p.compareAtPrice && p.compareAtPrice > p.price && (
                      <p className="text-gray-400 line-through text-sm">
                        ${formatPrice(p.compareAtPrice)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

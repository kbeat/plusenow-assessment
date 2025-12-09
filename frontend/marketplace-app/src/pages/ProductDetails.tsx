import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/services/api";
import { useCart } from "@/context/useCart";
import type { Product } from "@/types/Product";
import { formatPrice } from "@/utils/format";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Product>(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-gray-500 mt-10">Product not found</div>
    );
  }

  return (
    <div>
      <Link
        to="/products"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="rounded-xl w-full h-96 object-cover"
          />

          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {product.images.map((img: string, idx: string) => (
                <img
                  key={idx}
                  src={img}
                  className="w-20 h-20 object-cover rounded-md border hover:opacity-80 cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mt-3">
            <p className="text-blue-600 text-2xl font-semibold">
              ${formatPrice(product.price)}
            </p>
            {product.compareAtPrice && (
              <p className="line-through text-gray-400 text-lg">
                ${formatPrice(product.compareAtPrice)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500">★ {product.rating}</span>
            <span className="text-gray-500 text-sm">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="text-gray-700 mt-6">{product.description}</p>

          {product.specifications && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <ul className="space-y-1 text-gray-600">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-medium capitalize">{key}:</span>{" "}
                    {String(value)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            onClick={() => addItem(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

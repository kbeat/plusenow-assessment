import { useCart } from "@/context/useCart";
import type { CartItem } from "@/types/CartItem";
import { formatPrice } from "@/utils/format";

export default function Cart() {
  const { items, updateQty, removeItem, clearCart } = useCart();

  if (!items.length) {
    return (
      <div className="text-center mt-10 text-gray-500">Your cart is empty.</div>
    );
  }

  const total = items.reduce(
    (sum: number, i: CartItem) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      <div className="space-y-6">
        {items.map((item: CartItem) => (
          <div
            key={item.product.id}
            className="flex justify-between items-center bg-white shadow p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.images[0]}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-medium">{item.product.name}</h3>
                <p className="text-gray-600">
                  ${formatPrice(item.product.price)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded"
                onClick={() =>
                  updateQty(item.product.id, Math.max(1, item.quantity - 1))
                }
              >
                -
              </button>

              <span className="w-6 text-center">{item.quantity}</span>

              <button
                className="px-3 py-1 bg-gray-200 rounded"
                onClick={() => updateQty(item.product.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removeItem(item.product.id)}
            >
              Remove
            </button>

            <div className="font-semibold">
              ${formatPrice(item.product.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-10">
        <button className="text-red-600 hover:text-red-700" onClick={clearCart}>
          Clear Cart
        </button>

        <div className="text-xl font-semibold">
          Total: ${formatPrice(total)}
        </div>
      </div>
    </div>
  );
}

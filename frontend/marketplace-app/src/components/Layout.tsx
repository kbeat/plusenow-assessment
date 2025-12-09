import { Outlet, Link } from "react-router-dom";
import { useCart } from "@/context/useCart";

export default function Layout() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const { items } = useCart();
  const cartItems = Array.isArray(items) ? items : [];
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            <Link to="/">Marketplace App</Link>
          </h1>

          <div className="flex items-center gap-6">
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-gray-900"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={logout}
              className="text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

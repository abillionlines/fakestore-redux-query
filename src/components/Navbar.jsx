/*
Navbar
- Top navigation: app title, view switching and Cart button.
- Reads cart totals from Redux to display item count badge.
- Calls `setActiveTab` to switch between `home` and `cart` views.
*/

import React from "react";
import { useSelector } from "react-redux";
import { ShoppingCart, Store } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = ({ activeTab, setActiveTab }) => {
  const { items } = useSelector((state) => state.cart);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const { user, logout } = useAuth();
  const isAdmin = Boolean(
    user && (user.email === import.meta.env.VITE_ADMIN_EMAIL || user.uid === import.meta.env.VITE_ADMIN_UID),
  );

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setActiveTab("home")}
          >
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Store className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">
              Fake<span className="text-blue-600">Store</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab("home")}
              className={`font-semibold transition-colors duration-200 ${
                activeTab === "home"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Shop
            </button>

            <button
              onClick={() => setActiveTab("cart")}
              className={`relative flex items-center gap-2 font-semibold transition-colors duration-200 ${
                activeTab === "cart"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-in fade-in zoom-in duration-300">
                  {totalItems}
                </span>
              )}
            </button>
            {isAdmin && (
              <button onClick={() => setActiveTab("admin")} className="font-semibold text-gray-700">Admin</button>
            )}
            {user ? (
              <>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="font-semibold text-gray-700"
                >
                  Orders
                </button>
                <button
                  onClick={logout}
                  className="font-semibold text-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab("login")}
                  className="font-semibold text-gray-700"
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className="font-semibold text-gray-700"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

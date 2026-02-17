import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { User, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Navbar = () => {
  const server = import.meta.env.VITE_SERVER_URL;
  const isLoggedIn = Cookies.get("isLoggedIn") === "true";
  const navigate = useNavigate();
  console.log(Cookies.get("isLoggedIn"));
  console.log(isLoggedIn);
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${server}/logout`,
        {},
        { withCredentials: true },
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        console.log(` Response: ${response.data.message}`);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err || "An error occurred");
      console.log(`Error: ${err}`);
    }
  };
  return (
    <div className="fixed left-0 w-full top-0 flex items-center justify-between p-6 px-8 z-50">
      <div className="navLogo text-4xl font-bold">
        <Link to="/">
          Style<span className="text-pink-600">Gen</span>
        </Link>
      </div>

      <div className="flex items-center gap-10 px-10 py-4 rounded-full backdrop-blur-xl border border-gray-300/20">
        <Link to="/" className="hover:text-pink-300 transition">
          Home
        </Link>
        <Link to="/generate" className="hover:text-pink-300 transition">
          Generate
        </Link>
        <Link to="/my-generations" className="hover:text-pink-300 transition">
          My Generations
        </Link>
        <Link to="/" className="hover:text-pink-300 transition">
          Contact
        </Link>
      </div>

      <div>
        {isLoggedIn ? (
          <div className="relative group inline-block">
            {/* Profile Button */}
            <div className="cursor-pointer p-3 rounded-full bg-pink-600 hover:bg-pink-700 transition-colors duration-300">
              <User size={22} className="text-white font-extrabold" />
            </div>

            {/* Hover Dropdown */}
            <div
              className="absolute right-0 mt-2 w-32 cursor-pointer text-red-700
              bg-black/20 border backdrop-blur-2xl border-white/30 
               rounded-xl shadow-lg 
               opacity-0 invisible 
               group-hover:opacity-100 
               group-hover:visible 
               transition-all duration-200"
            >
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 cursor-pointer 
                 hover:bg-pink-600/20 
                 text-red-700 rounded-xl font-bold"
              >
                <LogOut size={18} className="inline-block mr-2" />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link
            to="/signup"
            className="px-10 py-4 rounded-full bg-pink-600 hover:bg-pink-700 transition-colors duration-300"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
};

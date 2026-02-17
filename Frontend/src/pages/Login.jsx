import React, { useEffect, useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const navigate = useNavigate();
  const server = import.meta.env.VITE_SERVER_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.status);
      if (response.status === 201) {
        navigate("/");
      }
      toast.success(response.data.message);
      console.log(` Response: ${response.data.message}`);
    } catch (err) {
      toast.error(err.response?.data?.message || err || "An error occurred");
      console.log(`Error: ${err}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-8 mt-8 bg-linear-to-r from-pink-200 to-pink-800 bg-clip-text text-transparent">
        Welcome back to your account
      </h1>
      <div className="border-4 border-gray-500/50 p-6 px-10 py-15 rounded-2xl">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block text-pink-500 text-xl mb-2 font-medium"
          >
            Email
          </label>
          <div className="flex justify-between">
            <Mail size={22} className="mt-3 mr-3 text-pink-700" />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
              id="email"
              className="border-3 border-white/50 p-2 rounded-lg focus:border-pink-700 outline-0 transition duration-400 mb-2 "
            />
          </div>

          <br />
          <label
            htmlFor="password"
            className="block text-pink-500 text-xl mb-2 font-medium"
          >
            Password
          </label>
          <div className="flex justify-between">
            <Lock size={22} className="mt-3 mr-3 text-pink-700" />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
              id="password"
              className="border-3 border-white/50 p-2 rounded-lg focus:border-pink-700 outline-0 transition duration-400 mb-8 "
            />
          </div>

          <Link
            to={"/signup"}
            className="text-sm text-pink-200/80 hover:text-pink-200 text-center"
          >
            New to StyleGen? Signup.{" "}
          </Link>
          <button
            type="dubmit"
            className="mt-2 w-full bg-pink-700 p-3 rounded-full cursor-pointer hover:bg-pink-700/60 transition-colors duration-300"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

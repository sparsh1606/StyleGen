import React from "react";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Generate } from "./pages/Generate";
import { Toaster } from "react-hot-toast";
import MyGenerations from "./pages/MyGenerations";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <div className="relative min-h-screen bg-black overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
            backgroundSize: "30px 40px",
          }}
        />

        {/* Top Left Pink/Red Blur */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-rose-400 rounded-full blur-3xl opacity-35"></div>

        {/* Bottom Right White Blur */}
        <div className="absolute bottom-70 -right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>

        {/* Your Main Content */}
        <div className="relative z-10 min-h-screen text-white">
          <Navbar />
          <div className="pt-24">
            <Toaster />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/my-generations" element={<MyGenerations />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

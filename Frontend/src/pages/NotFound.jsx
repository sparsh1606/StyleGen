import React from "react";

export default function NotFound() {
  return (
    <div className=" m-10 p-8 flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm rounded-3xl text-white">
      <h1 className="text-7xl font-extrabold text-pink-600">404</h1>
      <p className="mt-4 text-lg text-white/70">
        Oops! This page doesn’t exist.
      </p>
      <a href="/" className="mt-6 bg-pink-600 px-6 py-2 rounded-lg">
        Go Home
      </a>
    </div>
  );
}

import React from "react";

export const Footer = () => {
  return (
    <div className="backdrop-blur-sm mt-35 relative bottom-0 border-t border-white/10 backdrop-blur-1xl bg-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 text-white/70">
        {/* Brand */}
        <div>
          <h1 className="text-4xl font-bold text-white">StyleGen</h1>
          <p className="mt-4 text-sm leading-relaxed">
            AI-powered thumbnail generation platform built using MERN & Google
            Gemini. Create scroll-stopping thumbnails instantly.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-pink-400 cursor-pointer transition">
              Features
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition">
              Pricing
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition">
              Generate
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-pink-400 cursor-pointer transition">
              Documentation
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition">
              API
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition">
              Support
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-pink-400 cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-pink-400 cursor-pointer transition">
              Terms of Service
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 text-center text-sm text-white/50">
        © {new Date().getFullYear()} StyleGen. All rights reserved.
      </div>
    </div>
  );
};

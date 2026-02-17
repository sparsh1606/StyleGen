import React, { useEffect, useState } from "react";
import {
  RectangleHorizontal,
  RectangleVertical,
  ChevronDown,
  Square,
  Sparkle,
  PenTool,
  Image,
  Cpu,
  Disc,
  MountainSnow,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

export const Generate = () => {
  const server = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const checkauth = async () => {
      try {
        const respone = await axios.get(`${server}/verify`, {
          withCredentials: true,
        });
      } catch (err) {
        toast.error(err.response?.data?.message || err || "An error occurred");
        navigate("/login");
        console.log(err.response?.data?.message || err || "An error occurred");
      }
    };
    checkauth();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [textOver, setTextOver] = useState("");
  const [title, setTitle] = useState("");
  const [arOpen, setArOpen] = useState(false);
  const [aspectRatio, setaspectRatio] = useState("16:9");
  const aropts = ["16:9", "1:1"];
  const [thumbStyleOpen, setThumbStyleOpen] = useState(false);
  const [thumbnailStyle, setThumbnailStyle] = useState("Minimalist");
  const thumbStyleOpts = [
    "Minimalist",
    "Bold",
    "Illustrated",
    "Photorealistic",
    "Technical",
    "Playful",
  ];
  const thumbStyleMap = {
    Minimalist: [<Square />, "Clean, simple, distraction-free design"],
    Bold: [<Sparkle />, "High contrast, eye-catching visuals"],
    Illustrated: [<PenTool />, "Artistic, hand-drawn style graphics"],
    Photorealistic: [<Image />, "Realistic lighting and textures"],
    Technical: [<Cpu />, "Futuristic, data-driven aesthetic"],
    Playful: [<Disc />, "Fun, colorful, energetic vibe"],
  };
  const arMap = {
    "16:9": <RectangleHorizontal />,
    "1:1": <Square />,
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/generate`,
        {
          title,
          aspectRatio,
          thumbnailStyle,
          textOver,
        },
        {
          withCredentials: true,
        },
      );
      setImageUrl(response.data.imageUrl);
      setIsLoading(false);
      console.log(` Response: ${response.data.image}`);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response?.data?.message || err || "An error occurred");
      console.log(err.response?.data?.message || err || "An error occurred");
    }
  };
  return (
    <div className="flex items-start gap-10 px-20 py-2">
      <div className="border-2 border-gray-500/50 px-10 py-4 rounded-2xl bg-black/30">
        <h1 className="text-4xl font-bold bg-linear-to-r from-gray-200 to-white bg-clip-text text-transparent">
          Create your thumbnail
        </h1>
        <p className="text-white/70 mb-8">
          Describe your vision and let AI bring it to life
        </p>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="title"
            className="block text-white text-lg mb-1 font-medium"
          >
            Title or Topic
          </label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="e.g. Gaming Minecraft"
            id="titlee"
            className="w-full border-3 border-white/40 p-2 rounded-lg focus:border-pink-700 outline-0 transition duration-400 mb-5 "
          />
          <label className="block text-white text-lg mb-1 font-medium">
            Aspect Ratio
          </label>
          <div className="relative w-64">
            {/* Button */}
            <div
              onClick={() => setArOpen(!arOpen)}
              className={`w-1/2 flex justify-around items-center px-4 py-2 backdrop-blur-md border-3 text-white rounded-xl text-center cursor-pointer ${arOpen ? "border-pink-700" : "border-white/40"}`}
            >
              {arMap[aspectRatio]}
              {aspectRatio}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  arOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown */}
            {arOpen && (
              <div
                className="absolute mt-2 w-full 
                        border border-white/20 
                        rounded-xl shadow-lg bg-black/60 
                        backdrop-blur-xl z-50 text-center"
              >
                {aropts.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setaspectRatio(option);
                      setArOpen(false);
                    }}
                    className="px-4 py-2 
                         hover:bg-pink-600/20 
                         text-white cursor-pointer flex items-center justify-center gap-2 transition-colors duration-300 "
                  >
                    <p> {arMap[option]}</p>
                    <p>{option}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className="block mt-5 text-white text-lg mb-1 font-medium">
            Thumbnail Style
          </label>
          <div className="relative w-64">
            {/* Button */}
            <div
              onClick={() => setThumbStyleOpen(!thumbStyleOpen)}
              className={`w-full flex justify-around items-center px-4 py-2 backdrop-blur-md border-3 text-white rounded-xl text-center cursor-pointer ${thumbStyleOpen ? "border-pink-700" : "border-white/40"}`}
            >
              {thumbStyleMap[thumbnailStyle][0]}
              {thumbnailStyle}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  thumbStyleOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown */}
            {thumbStyleOpen && (
              <div
                className="absolute left-65 -top-70 mt-2 w-full 
                        border border-white/20 
                        rounded-xl shadow-lg 
                        backdrop-blur-xl z-100 text-center bg-black/60"
              >
                {thumbStyleOpts.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setThumbnailStyle(option);
                      setThumbStyleOpen(false);
                    }}
                    className="px-4 py-2 
                         hover:bg-pink-600/20 
                         text-white cursor-pointer flex items-center justify-start flex-row gap-2 transition-colors duration-300 backdrop-blur-md"
                  >
                    <p> {thumbStyleMap[option][0]}</p>
                    <p className="text-start">
                      {option} <br />
                      <span className="text-white/70 text-sm">
                        {thumbStyleMap[option][1]}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className="block text-white text-lg mb-1 font-medium mt-5">
            Text on Thumbnail (Optional)
            <p className="text-sm text-white/70 mb-2">
              Should be small (3-4 words)
            </p>
          </label>
          <textarea
            onChange={(e) => {
              setTextOver(e.target.value);
            }}
            type="text"
            placeholder="e.g. MineCraft Ep.2"
            id="titlee"
            className="w-full border-3 border-white/40 p-2 rounded-lg focus:border-pink-700 outline-0 transition duration-400 mb-5 resize-none h-20"
          />

          <br />

          <button
            type="submit"
            className="flex items-center justify-center text-lg font-bold mt-2 w-full bg-pink-700 p-3 rounded-full cursor-pointer hover:bg-pink-700/90 transition-colors duration-300"
          >
            {isLoading === true ? (
              <HashLoader color="white" size={28} />
            ) : (
              "Generate"
            )}
          </button>
        </form>
      </div>

      <div
        className={`p-3 w-1/2 max-w-220 ml-4 mt-2 border border-gray-500/50 rounded-2xl backdrop-blur-sm flex-col items-center justify-center`}
      >
        <p className="text-lg font-bold mb-3">Preview</p>
        <div
          className={`flex justify-center items-center overflow-hidden border-dashed w-full max-h-130 ${aspectRatio === "16:9" ? "aspect-video" : "aspect-square"}  border-2 border-gray-500/50 rounded-2xl`}
        >
          {imageUrl !== "" ? (
            <div className="relative group">
              <img src={imageUrl} alt="generatedImage" className="" />
              <button
                onClick={() => window.open(imageUrl)}
                className="absolute top-12 right-3 backdrop-blur-3xl bg-black/30 p-2 shadow-white shadow border border-white/20 rounded-full text-white cursor-pointer opacity-0 hover:text-pink-700 hover:scale-101 group-hover:opacity-100 transition duration-75"
              >
                <Download />
              </button>
            </div>
          ) : (
            <div>
              <MountainSnow
                size={50}
                className="text-white/70 font-extrabold"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

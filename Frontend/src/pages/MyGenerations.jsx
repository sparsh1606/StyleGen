import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import { HashLoader } from "react-spinners";

const MyGenerations = () => {
  const server = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState();
  useEffect(() => {
    const checkauth = async () => {
      setIsLoading(true);
      try {
        const respone = await axios.get(`${server}/verify`, {
          withCredentials: true,
        });
        setIsLoading(false);
      } catch (err) {
        toast.error(err.response?.data?.message || err || "An error occurred");
        setIsLoading(false);
        navigate("/login");
        console.log(err.response?.data?.message || err || "An error occurred");
      }
    };
    checkauth();
  }, []);
  useEffect(() => {
    const getThumb = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${server}/my-generations`, {
          withCredentials: true,
        });
        setIsLoading(false);
        setThumbnails(response.data);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    getThumb();
  }, []);
  return (
    <>
      {isLoading === false ? (
        <div className="flex justify-center items-center">
          {thumbnails?.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 p-6">
              {thumbnails.map((thumbnail) => (
                <div
                  key={thumbnail._id}
                  className="relative group hover:scale-95 transition-transform duration-300 shadow-lg shadow-gray-200/20 rounded-3xl"
                >
                  <img
                    key={thumbnail._id}
                    src={thumbnail.imageUrl}
                    alt={thumbnail.title}
                    className="w-full mb-4 rounded-3xl border-4 border-white/50 cursor-pointer  "
                  />
                  <button
                    onClick={() => window.open(thumbnail.imageUrl)}
                    className="absolute top-3 right-3 backdrop-blur-3xl bg-black/30 p-2 shadow-white shadow border border-white/20 rounded-full text-white cursor-pointer opacity-0 hover:text-pink-700 hover:scale-101 group-hover:opacity-100 transition duration-75"
                  >
                    <Download />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/70 font-extrabold m-6 text-3xl">
              No Thumbnails yet...
            </p>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <HashLoader size={50} color="white" />
        </div>
      )}
    </>
  );
};

export default MyGenerations;

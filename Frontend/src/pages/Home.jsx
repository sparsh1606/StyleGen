import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, Diameter, ThumbsUp, Zap } from "lucide-react";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkauth = async () => {
      setIsLoadingMain(true);
      try {
        const respone = await axios.get(`${server}/verify`, {
          withCredentials: true,
        });
        setIsLoggedIn(true);
      } catch (err) {
        toast.error(err.response?.data?.message || err || "An error occurred");
        navigate("/login");
        setIsLoggedIn(false);
        console.log(err.response?.data?.message || err || "An error occurred");
      }
    };
    checkauth();
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-26 px-4 sm:px-0">
      <h1 className="text-4xl md:text-6xl max-w-3xl font-extrabold text-center">
        AI Thumbnail Generator
      </h1>
      <h1 className="mt-2 text-4xl md:text-6xl max-w-3xl font-extrabold text-center">
        for your{" "}
        <span className="bg-pink-600 rounded-3xl p-2 font-extrabold text-center md:ml-2">
          Videos
        </span>
      </h1>

      <p className="text-base md:text-xl mt-2 p-6 md:p-8 max-w-xl text-center text-white/70">
        Stop wasting hours on design. Get high-converting thumbnails in seconds
        with our advanced AI.
      </p>

      <div>
        <Link
          to={isLoggedIn === true ? "/generate" : "/signup"}
          className="block w-full sm:inline-block sm:w-auto text-center px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-pink-600 hover:bg-pink-700 transition-colors duration-300"
        >
          Get Started
        </Link>
      </div>

      <div
        id="homeOpts"
        className="flex flex-col sm:flex-row justify-between w-full sm:w-1/2 mt-6 mb-8 px-6 sm:px-8 py-4 sm:py-6 rounded-full border border-gray-600 backdrop-blur-2xl bg-white/10"
      >
        <div className="flex items-center gap-2">
          <Check className="mx-2 text-pink-700" />
          <p>No design skills needed</p>
        </div>
        <div className="flex items-center gap-2">
          <Check className="mx-2 text-pink-700" />
          <p>Fast generation</p>
        </div>
        <div className="flex items-center gap-2">
          <Check className="mx-2 text-pink-700" />
          <p>High CTR templates</p>
        </div>
      </div>

      <h1 className="mt-8 p-6 text-6xl text-center">
        Why use our Thumbnail Generator?
      </h1>
      <p className="text-xl text-center text-white/70">
        Create stunning thumbnails that get clicks, without the hassle.
      </p>

      <div className="flex flex-wrap justify-center items-center mt-8 mb-8 gap-5">
        <div className="outCard">
          <div className="card">
            <Zap size={25} className="mb-3 text-pink-700 text-3xl" />
            <h6 className="mb-3 text-2xl font-bold">Smart Analysis</h6>
            <p className="text-white/70 text-base">
              Our AI analyzes video content to suggest the most clickable
              concepts.
            </p>
          </div>
        </div>
        <div className="outCard">
          <div className="card">
            <ThumbsUp size={25} className="mb-3 text-pink-700 text-3xl" />
            <h6 className="mb-3 text-2xl font-bold">Eye-Catching Designs</h6>
            <p className="text-white/70 text-base">
              Generate vibrant, high-contrast thumbnails that stand out in the
              feed.
            </p>
          </div>
        </div>
        <div className="outCard">
          <div className="card">
            <Diameter size={25} className="mb-3 text-pink-700 text-3xl" />
            <h6 className="mb-3 text-2xl font-bold">Fully Editable</h6>
            <p className="text-white/70 text-base">
              Get fully layered designs you can tweak to perfection if needed.
            </p>
          </div>
        </div>
      </div>

      <div
        id="homeLower"
        className="flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-8 mt-12 rounded-3xl bg-linear-to-l from-pink-950 to-pink-600 mx-4 md:mx-8 w-full md:w-11/12 gap-6"
      >
        <div className="mr-0 md:mr-8 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold">
            Ready to go viral?
          </h1>
          <p className="text-white/70 mt-2">
            Join thousands of creators using AI to boost their CTR.
          </p>
        </div>

        <div
          id="homeLowerGetStarted"
          className="w-full md:w-1/4 text-center md:text-right"
        >
          <Link
            to={isLoggedIn === true ? "/generate" : "/signup"}
            className="inline-block w-full md:w-auto ml-0 md:ml-10 px-8 md:px-10 py-3 md:py-4 rounded-full text-black bg-white hover:bg-white/80 transition-colors duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

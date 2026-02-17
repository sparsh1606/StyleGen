import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import cloudinary from "../utils/cloudinary.js";
import Thumbnail from "../models/thumbnail.model.js";

const generateThumbnail = async (req, res) => {
  const { title, aspectRatio, thumbnailStyle, textOver } = req.body;
  if (!title) {
    return res.status(400).json({
      message: "Title is required. ",
    });
  }
  try {
    let formattedText, words, mid, line1, line2, finalUrl;
    if (textOver) {
      words = textOver.split(" ");
      mid = Math.ceil(words.length / 2);

      line1 = words.slice(0, mid).join(" ");
      line2 = words.slice(mid).join(" ");
    }

    formattedText = encodeURIComponent(`${line1}\n${line2}`) || " ";

    const response = await axios.get("https://api.pexels.com/v1/search", {
      params: {
        query: title,
        orientation: aspectRatio === "16:9" ? "landscape" : "square",
      },
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
    });

    if (!response.data.photos.length) {
      return res
        .status(404)
        .json({ message: "Server Down, Please try again later" });
    }

    const imageUrl = response.data.photos[0].src.large;

    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "stylegen/thumbnails",
    });

    if (textOver) {
      finalUrl = cloudinary.url(result.public_id, {
        transformation: [
          {
            overlay: {
              font_family: "Arial",
              font_size: 100,
              font_weight: "bold",
              text: formattedText,
            },
            color: "black",
            gravity: "north_west",
            x: 65,
            y: 65,
          },

          // Main text layer (White)
          {
            overlay: {
              font_family: "Arial",
              font_size: 100,
              font_weight: "bold",
              text: formattedText,
            },
            color: "white",
            gravity: "north_west",
            x: 60,
            y: 60,
            effect: "shadow",
          },
        ],
      });
    } else {
      finalUrl = result.url;
    }
    const newThumbnail = new Thumbnail({
      imageUrl: finalUrl,
      title: title,
      userId: req.userId,
    });
    await newThumbnail.save();
    res.status(200).json({
      imageUrl: finalUrl,
      message: "Thumbnail generated successfully!",
    });
  } catch (err) {
    console.log(err.response ? err.response.data : err.message);
  }
};

export { generateThumbnail };

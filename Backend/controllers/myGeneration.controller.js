import Thumbnail from "../models/thumbnail.model.js";

const myGenerations = async (req, res) => {
  try {
    const userId = req.userId;
    const thumbnails = await Thumbnail.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(thumbnails);
  } catch (err) {
    console.error("Error fetching user generations:", err);
    res.status(500).json({ message: "Failed to fetch generations" });
  }
};

export { myGenerations };

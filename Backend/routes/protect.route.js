import express from "express";
const router = express.Router();
import protect from "../middleware/auth.protect.middleware.js";

router.get("/verify", protect, (req, res) => {
  res.status(200).json({ message: "You are authenticated" });
});

export default router;

import express from "express";
const router = express.Router();
import { generateThumbnail } from "../controllers/generate.controller.js";
import { myGenerations } from "../controllers/myGeneration.controller.js";
import protect from "../middleware/auth.protect.middleware.js";

router.post("/generate", protect, generateThumbnail);
router.get("/my-generations", protect, myGenerations);

export default router;

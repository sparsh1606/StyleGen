import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import generateRoute from "./routes/generation.route.js";
import cookieParser from "cookie-parser";
import protectRoute from "./routes/protect.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/v1", authRoutes);
app.use("/api/v1", generateRoute);
app.use("/api/v1", protectRoute);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(PORT, () => {
  console.log("Server is running!!");
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
  });
});

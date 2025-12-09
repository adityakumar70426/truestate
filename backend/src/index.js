import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import salesRouter from "./routes/salesRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/sales", salesRouter);

// Use environment variable for MongoDB URI, fallback to local for development
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

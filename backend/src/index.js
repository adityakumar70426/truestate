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
// const PORT = process.env.PORT || 4000;
// // Force IPv4 local Mongo to avoid ::1 issues
// const MONGODB_URI = "mongodb://127.0.0.1:27017/truestate";
const PORT = 4000;
const MONGODB_URI = "mongodb://127.0.0.1:27017/truestate";


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

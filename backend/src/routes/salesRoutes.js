import express from "express";
import { listSales } from "../controllers/salesController.js";

const router = express.Router();

router.get("/", listSales);

export default router;

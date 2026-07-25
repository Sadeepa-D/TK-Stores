import express from "express";
import { addUsage } from "../controllers/UsageController";

const router = express.Router();

router.post("/add", addUsage);

export default router;

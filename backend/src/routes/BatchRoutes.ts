import express from "express";
import { addBatch } from "../controllers/BatchController";
import authMiddleware from "../middlewares/auth";
import roleMiddleware from "../middlewares/RoleBaseAcess";

const router = express.Router();

router.post("/add", authMiddleware, roleMiddleware(["admin"]), addBatch);

export default router;

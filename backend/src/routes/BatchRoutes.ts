import express from "express";
import { addBatch, deleteBatch, getAllBatches } from "../controllers/BatchController";
import authMiddleware from "../middlewares/auth";
import roleMiddleware from "../middlewares/RoleBaseAcess";

const router = express.Router();

router.post("/add", authMiddleware, roleMiddleware(["Admin","User"]), addBatch);
router.get("/viewall", authMiddleware, roleMiddleware(["Admin","User"]), getAllBatches);
router.delete("/delete/:id", authMiddleware, roleMiddleware(["Admin","User"]), deleteBatch);

export default router;

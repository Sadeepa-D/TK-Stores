import express from "express";
import {
  addUsage,
  getAllUsages,
  deleteUsage,
} from "../controllers/UsageController";

const router = express.Router();

router.post("/add", addUsage);
router.get("/viewall", getAllUsages);
router.delete("/delete/:id", deleteUsage);
export default router;

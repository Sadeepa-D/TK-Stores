import express from "express";
import {
  activateBatch,
  addBatch,
  deactivateBatch,
  deleteBatch,
  getAllBatches,
  updateBatch,
} from "../controllers/BatchController";
import authMiddleware from "../middlewares/auth";
import roleMiddleware from "../middlewares/RoleBaseAcess";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  roleMiddleware(["Admin", "User"]),
  addBatch,
);
router.get(
  "/viewall",
  authMiddleware,
  roleMiddleware(["Admin", "User"]),
  getAllBatches,
);
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["Admin", "User"]),
  deleteBatch,
);
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware(["Admin", "User"]),
  updateBatch,
);
router.put(
  "/activate/:id",
  authMiddleware,
  roleMiddleware(["Admin", "User"]),
  activateBatch,
);
router.put(
  "/deactivate/:id",
  authMiddleware,
  roleMiddleware(["Admin", "User"]),
  deactivateBatch,
);

export default router;

import express from "express";
import {
  addUsage,
  getAllUsages,
  deleteUsage,
  updateUsage,
} from "../controllers/UsageController";
import authMiddleware from "../middlewares/auth";
import roleBasedAccess from "../middlewares/RoleBaseAcess";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  roleBasedAccess(["Admin", "User"]),
  addUsage,
);
router.get(
  "/viewall",
  authMiddleware,
  roleBasedAccess(["Admin", "User"]),
  getAllUsages,
);
router.delete(
  "/delete/:id",
  authMiddleware,
  roleBasedAccess(["Admin", "User"]),
  deleteUsage,
);
router.put(
  "/update/:id",
  authMiddleware,
  roleBasedAccess(["Admin", "User"]),
  updateUsage,
);
export default router;

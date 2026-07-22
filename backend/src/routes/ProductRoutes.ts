import express from "express";
import { addProduct, getAllProducts } from "../controllers/ProductController";
import authMiddleware from "../middlewares/auth";
import roleBasedAccess from "../middlewares/RoleBaseAcess";

const router = express.Router();

router.post("/add", authMiddleware, roleBasedAccess(["Admin","User"]), addProduct);
router.get("/viewall", authMiddleware, roleBasedAccess(["Admin","User"]), getAllProducts);

export default router;

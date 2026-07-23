import express from "express";
import { addProduct, getAllProducts,updateProduct,activateProduct,deactivateProduct,deleteProduct } from "../controllers/ProductController";
import authMiddleware from "../middlewares/auth";
import roleBasedAccess from "../middlewares/RoleBaseAcess";

const router = express.Router();

router.post("/add", authMiddleware, roleBasedAccess(["Admin","User"]), addProduct);
router.get("/viewall", authMiddleware, roleBasedAccess(["Admin","User"]), getAllProducts);
router.put("/update/:id", authMiddleware, roleBasedAccess(["Admin","User"]), updateProduct);
router.delete("/delete/:id", authMiddleware, roleBasedAccess(["Admin","User"]), deleteProduct);
router.put("/activate/:id", authMiddleware, roleBasedAccess(["Admin","User"]), activateProduct);
router.put("/deactivate/:id", authMiddleware, roleBasedAccess(["Admin","User"]), deactivateProduct);

export default router;

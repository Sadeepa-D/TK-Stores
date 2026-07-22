import express from "express";
import { registerUser, login, viewUsers } from "../controllers/UserController";
import roleBasedAccess from "../middlewares/RoleBaseAcess";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/viewall", auth, roleBasedAccess(["Admin"]), viewUsers);
export default router;

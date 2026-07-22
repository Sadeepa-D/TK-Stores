import express from "express";
import {
  registerUser,
  login,
  viewUsers,
  suspendedUser,
  deleteUser,
  activeUser,
} from "../controllers/UserController";
import roleBasedAccess from "../middlewares/RoleBaseAcess";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/register", auth, roleBasedAccess(["Admin"]), registerUser);
router.post("/login", login);
router.get("/viewall", auth, roleBasedAccess(["Admin"]), viewUsers);
router.put("/suspend/:userId", auth, roleBasedAccess(["Admin"]), suspendedUser);
router.put("/activate/:userId", auth, roleBasedAccess(["Admin"]), activeUser);
router.delete("/delete/:userId", auth, roleBasedAccess(["Admin"]), deleteUser);

export default router;

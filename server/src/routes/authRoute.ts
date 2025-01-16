import express from "express";
import { authController } from "../controllers";

const router = express.Router();

router.post("/register", authController.handleRegister);
router.post("/login", authController.handleLogin);
router.get("/refresh", authController.handleRefresh);
router.get("/logout", authController.handleLogout);

export default router;

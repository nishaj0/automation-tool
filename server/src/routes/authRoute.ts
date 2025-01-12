import express from "express";
import { authController } from "../controllers";

const router = express.Router();

router.post("/register", authController.handleRegister);

export default router;

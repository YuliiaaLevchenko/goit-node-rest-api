import express from "express";

import { AuthController, getCurrentUser } from "../controllers/auth.js";

import { authMiddleware, auth } from "../middleware/auth.js";


const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, AuthController.register);
router.post("/login", jsonParser, AuthController.login);
router.get("/logout", authMiddleware, AuthController.logout);
router.get("/current", auth, getCurrentUser);

export default router;
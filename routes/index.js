import express from "express";

import authMiddleware from "./middleware/auth";

import authRoutes from "./auth.js";
import contactRoutes from "./contactsRouter.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/contact", authMiddleware, contactRoutes);

export default router;
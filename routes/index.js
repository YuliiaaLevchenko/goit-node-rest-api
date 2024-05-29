import express from "express";

import auth from "../middleware/auth.js";

import authRoutes from "./auth.js";
import contactRoutes from "./contactsRouter.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/contact", auth, contactRoutes);

export default router;
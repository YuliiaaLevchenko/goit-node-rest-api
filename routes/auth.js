import express from "express";

import { register, login, logout, getCurrentUser } from "../controllers/auth.js";

import auth, { validateUser } from "../middleware/auth.js";


const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, validateUser, register);
router.post("/login", jsonParser, login);
router.get("/logout", auth, logout);
router.get("/current", auth, getCurrentUser);

export default router;
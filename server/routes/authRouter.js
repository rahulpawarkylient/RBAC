import express from "express";
import { getallusers, login, register } from "../controller/AuthController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getallusers);

export default router;

import express from "express";
import { createUserAuth, loginUserAuth } from "../controllers/userAuth";
const router = express.Router();

router.post("/auth/signup", createUserAuth);
router.post("auth/login", loginUserAuth);
export default router;

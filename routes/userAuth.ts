import express from "express";
import { createUserAuth } from "../controllers/userAuth";
const router = express.Router();

router.post("/auth/signup", createUserAuth);

export default router;

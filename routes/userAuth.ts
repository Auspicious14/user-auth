import express from "express";
import { getUsers } from "../controllers/account";
import { createUserAuth, loginUserAuth } from "../controllers/userAuth";
const router = express.Router();

router.post("/auth/signup", createUserAuth);
router.post("auth/login", loginUserAuth);
router.get("/account", getUsers);
export default router;

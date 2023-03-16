import express from "express";
import { getUsers } from "../controllers/account";
const router = express.Router();

router.get("/account", getUsers);
export default router;

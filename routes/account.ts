import express from "express";
import { getUsers } from "../controllers/account";
import verifyRoles from "../middlewares/userRoles";
import dotenv from "dotenv";
dotenv.config();

const userRoleNumber = process.env.USER_ROLE_NUMBER;

const accountRouter = express.Router();

accountRouter.get("/account", verifyRoles([2312]), getUsers);
export default accountRouter;

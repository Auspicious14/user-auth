import express from "express";
import { getUsers } from "../controllers/account";
const accountRouter = express.Router();

accountRouter.get("/account", getUsers);
export default accountRouter;

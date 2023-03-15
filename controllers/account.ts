const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userAuthModel from "../models/userAuth";
import { handleErrors } from "../middlewares/userAuth";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userAuthModel.find();
    console.log(users);
    res.json({ users });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors });
  }
};

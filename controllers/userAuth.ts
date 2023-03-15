import { Request, Response } from "express";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
import userAuthModel from "../models/userAuth";
const secret = process.env.TOKEN_SECRET;
const expiresIn = 24 * 60 * 60;

const createToken = (id: string) => {
  return jwt.sign({ id }, secret, { expiresIn });
};
export const createUserAuth = async (req: Request, res: Response) => {
  console.log(req.body);
  const { firstName, lastName, roles, email, password } = req.body;
  try {
    const generateSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, generateSalt);
    const user: any = await userAuthModel.create({
      firstName,
      lastName,
      roles,
      email,
      password: hashedPassword,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: expiresIn * 1000 });
    res.json({ user });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

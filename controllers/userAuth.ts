const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userAuthModel from "../models/userAuth";
import { handleErrors } from "../middlewares/userAuth";
dotenv.config();
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
      roles: roles || "member",
      email,
      password: hashedPassword,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: expiresIn * 1000 });
    res.json({ user });
    console.log(user);
  } catch (error) {
    console.log(error);
    const err = handleErrors(error);
    res.json({ err });
  }
};

export const loginUserAuth = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: any = userAuthModel.findOne(email);
    if (!user.email) return res.json({ status: "Not found" }).sendStatus(404);
    const comparePassword: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!comparePassword)
      return res.sendStatus(404).json({ password: "Not matched" });
    const token = createToken(user?._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: expiresIn * 1000 });
    res.json({ user, token });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors });
  }
};

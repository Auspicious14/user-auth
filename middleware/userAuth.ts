import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userAuthModel from "../models/userAuth";
export const createUserAuth = async (req: Request, res: Response) => {
  const { firstName, lastName, roles, email, password } = req.body;
  const generateSalt = bcrypt.genSalt();
  const hashedPassword = bcrypt.hash(password, generateSalt);
  try {
    const userAuth = await userAuthModel.create({
      firstName,
      lastName,
      roles,
      email,
      password: hashedPassword,
    });
    const data = await userAuth.toJSON();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

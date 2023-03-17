import { Request, Response } from "express";
import userAuthModel from "../models/userAuth";
import { handleErrors } from "../middlewares/userAuth";

export const getUsers = async (req: Request, res: Response) => {
  const { email, password, roles } = req.body;

  try {
    const authUser: any = await userAuthModel.findOne(email);
    if (authUser.roles[0] === "admin") {
      const users = await userAuthModel.find();
      console.log(users);
      res.json({ users });
    } else {
      res.sendStatus(403).json({ error: "Forbidden" });
    }
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors });
  }
};

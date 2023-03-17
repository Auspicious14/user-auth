import { Request, Response, NextFunction } from "express";
import { roles } from "./roles";

export const verifyRoles = (action: any, resource: any) => {
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const permission = roles.can(req.user.roles)[action](resource);
      if (!permission)
        return res
          .sendStatus(401)
          .json({ error: `You don't have permission to access the page` });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const allowLogIn = (req: Request, res: Request, next: NextFunction) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user) return res.sendStatus(401).json({ error: `we don't ` });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

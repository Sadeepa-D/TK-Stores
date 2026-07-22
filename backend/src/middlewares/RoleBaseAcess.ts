import { Request, Response, NextFunction } from "express";

const roleBasedAccess = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: Unauthorized role" });
    }

    next();
  };
};

export default roleBasedAccess;

import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");
const key = process.env.key;

function authenticateJwt(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, key);
    req.headers["user"] = user.email;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
export default authenticateJwt;

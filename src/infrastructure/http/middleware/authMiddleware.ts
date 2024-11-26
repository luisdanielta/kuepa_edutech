import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string
      username: string
      role: "user" | "moderator"
    }

    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    }

    next()
  } catch (error) {
    res.status(403).json({ error })
  }
}

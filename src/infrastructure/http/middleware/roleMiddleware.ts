import { Response, NextFunction } from "express"
import { AuthenticatedRequest } from "./authMiddleware"

export const authorizeRoles = (roles: Array<"user" | "moderator">) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" })
      return
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden: Access is denied" })
      return
    }

    next()
  }
}

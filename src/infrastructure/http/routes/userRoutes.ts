import { Router } from "express"
import { UserController } from "../controllers/userController"
import { UserUseCases } from "@/application/user/userUseCases"
import { MongoUserRepository } from "@/infrastructure/database/mongoUserRepository"
import { authenticateJWT } from "../middleware/authMiddleware"
import { authorizeRoles } from "../middleware/roleMiddleware"
import { asyncHandler } from "../middleware/asyncHandler"

const UserRouter = Router()

const userRepository = new MongoUserRepository()
const userUseCases = new UserUseCases(userRepository)
const userController = new UserController(userUseCases)

UserRouter.post(
  "/",
  authenticateJWT,
  authorizeRoles(["moderator"]),
  asyncHandler(userController.create),
)

UserRouter.get(
  "/",
  authenticateJWT,
  authorizeRoles(["moderator"]),
  asyncHandler(userController.getAll),
)

UserRouter.get(
  "/:id",
  authenticateJWT,
  authorizeRoles(["moderator"]),
  asyncHandler(userController.getById),
)

UserRouter.put(
  "/:id",
  authenticateJWT,
  authorizeRoles(["moderator"]),
  asyncHandler(userController.update),
)

UserRouter.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles(["moderator"]),
  asyncHandler(userController.delete),
)

export default UserRouter

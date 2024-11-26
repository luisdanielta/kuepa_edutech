import { Router } from "express"
import { authController } from "../controllers/authController"
import { asyncHandler } from "../middleware/asyncHandler"

const AuthRouter = Router()

// Public routes for guest users
AuthRouter.post("/signup", asyncHandler(authController.signup))
AuthRouter.post("/login", asyncHandler(authController.login))

export default AuthRouter

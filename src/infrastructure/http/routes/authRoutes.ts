import { Router } from "express"
import { AuthController } from "../controllers/authController"

const AuthRouter = Router()

AuthRouter.post("/signup", AuthController.signup)
AuthRouter.post("/login", AuthController.login)

export default AuthRouter

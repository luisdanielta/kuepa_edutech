import { Router } from "express"
import { MongoUserRepository } from "@/infrastructure/database/mongoUserRepository"
import { CreateUser } from "@/application/user/createUser"
import { GetUserById } from "@/application/user/getUserById"
import { UserController } from "../controllers/userController"

const UserRouter = Router()

const userRepository = new MongoUserRepository()
const createUser = new CreateUser(userRepository)
const getUserById = new GetUserById(userRepository)

const userController = new UserController(createUser, getUserById)

UserRouter.post("/", (req, res) => userController.create(req, res))
UserRouter.get("/:id", (req, res) => userController.getById(req, res))
export default UserRouter

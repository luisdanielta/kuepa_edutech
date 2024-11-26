import { Request, Response } from "express"
import { UserUseCases } from "@/application/user/userUseCases"

export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  public create = async (req: Request, res: Response): Promise<void> => {
    const { name, username, email, password, role } = req.body

    if (!name || !username || !email || !password) {
      res.status(400).json({ message: "All fields are required" })
      return
    }

    const user = await this.userUseCases.createUser({
      name,
      username,
      email,
      password,
      role,
    })

    res.status(201).json(user)
  }

  public getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    const user = await this.userUseCases.getUserById(id)
    if (!user) {
      res.status(404).json({ message: "User not found" })
      return
    }

    res.json(user)
  }

  public getAll = async (_req: Request, res: Response): Promise<void> => {
    const users = await this.userUseCases.getAllUsers()
    res.json(users)
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const data = req.body

    const updatedUser = await this.userUseCases.updateUser(id, data)
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" })
      return
    }

    res.json(updatedUser)
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    const success = await this.userUseCases.deleteUser(id)
    if (!success) {
      res.status(404).json({ message: "User not found" })
      return
    }

    res.status(204).send()
  }
}

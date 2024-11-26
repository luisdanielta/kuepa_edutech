import { Request, Response } from "express"
import { CreateUser } from "@/application/user/createUser"
import { GetUserById } from "@/application/user/getUserById"

export class UserController {
  constructor(
    private createUser: CreateUser,
    private getUserById: GetUserById,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.createUser.execute(req.body)
      res.status(201).json(user)
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.getUserById.execute(req.params.id)
      if (!user) res.status(404).json({ error: "User not found" })
      res.json(user)
    } catch (error) {
      res.status(400).json({ error })
    }
  }
}

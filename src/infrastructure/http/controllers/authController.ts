import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserModel } from "@/infrastructure/database/userModel"

export class AuthController {
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, username, email, password } = req.body

      const existingUser = await UserModel.findOne({ email })
      if (existingUser) {
        res.status(400).json({ error: "Email already in use" })
        return
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await UserModel.create({
        name,
        username,
        email,
        password: hashedPassword,
      })

      res.status(201).json({ message: "User created successfully", user })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body

      const user = await UserModel.findOne({ username })
      if (!user) {
        res.status(404).json({ error: "User not found" })
        return
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid password" })
        return
      }

      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" },
      )

      res.status(200).json({ message: "Login successful", token })
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}

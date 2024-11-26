import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { MongoUserRepository } from "@/infrastructure/database/mongoUserRepository"
import { User } from "@/domain/entities/user"

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"

export class AuthController {
  private userRepository: MongoUserRepository

  constructor(userRepository: MongoUserRepository) {
    this.userRepository = userRepository
  }

  // Handles user signup and creates a new user
  public signup = async (req: Request, res: Response): Promise<void> => {
    const { email, username, password, role } = req.body

    if (!email || !username || !password) {
      res
        .status(400)
        .json({ message: "Email, username, and password are required" })
      return
    }

    const existingUser = await this.userRepository.findByUsername(username)
    if (existingUser) {
      res.status(409).json({ message: "Username already exists" })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User(
      null,
      username,
      username,
      email,
      hashedPassword,
      new Date(),
      true,
      role === "moderator" ? "moderator" : "user",
    )

    const createdUser = await this.userRepository.create(user)

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
        role: createdUser.role,
      },
    })
  }

  // Handles user login and generates a JWT
  public login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body

    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" })
      return
    }

    const user = await this.userRepository.findByUsername(username)
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" })
      return
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" },
    )

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    })
  }
}

// Singleton instance for easy import
export const authController = new AuthController(new MongoUserRepository())

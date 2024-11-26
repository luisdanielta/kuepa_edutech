import { User } from "@/domain/entities/user"
import { UserRepository } from "@/domain/repositories/userRepository"

interface CreateUserDTO {
  name: string
  username: string
  email: string
  password: string
  role?: "user" | "moderator"
}

export class UserUseCases {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    const user = new User(
      null,
      data.name,
      data.username,
      data.email,
      data.password,
      new Date(),
      true,
      data.role || "user",
    )
    return this.userRepository.create(user)
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id)
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll()
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, data)
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id)
  }
}

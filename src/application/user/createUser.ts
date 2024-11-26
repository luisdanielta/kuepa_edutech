import { User } from "@/domain/entities/user"
import { UserRepository } from "@/domain/repositories/userRepository"

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: {
    name: string
    username: string
    email: string
    password: string
  }): Promise<User> {
    const user = new User(
      null,
      data.name,
      data.username,
      data.email,
      data.password,
      new Date(),
    )
    return this.userRepository.create(user)
  }
}

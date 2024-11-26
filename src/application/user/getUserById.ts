import { UserRepository } from "@/domain/repositories/userRepository"
import { User } from "@/domain/entities/user"

export class GetUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id)
  }
}

import { User } from "@/domain/entities/user"
import { UserRepository } from "@/domain/repositories/userRepository"
import { UserModel, UserDocument } from "./userModel"

export class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await UserModel.create(user)
    return this.mapDocumentToEntity(createdUser)
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id)
    return user ? this.mapDocumentToEntity(user) : null
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username })
    return user ? this.mapDocumentToEntity(user) : null
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.find()
    return users.map((user) => this.mapDocumentToEntity(user))
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    })
    return updatedUser ? this.mapDocumentToEntity(updatedUser) : null
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id)
    return !!result
  }

  private mapDocumentToEntity(user: UserDocument): User {
    return new User(
      user.id,
      user.name,
      user.username,
      user.email,
      user.password,
      user.createdAt,
      user.status,
      user.role,
    )
  }
}

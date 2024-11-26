import { User } from "@/domain/entities/user"
import { UserRepository } from "@/domain/repositories/userRepository"
import { UserModel } from "./userModel"

export class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await UserModel.create(user)
    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.username,
      createdUser.email,
      createdUser.password,
      createdUser.createdAt,
      createdUser.status,
      createdUser.role,
    )
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id)
    if (!user) return null

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

  async findAll(): Promise<User[]> {
    const users = await UserModel.find()
    return users.map(
      (user) =>
        new User(
          user.id,
          user.name,
          user.username,
          user.email,
          user.password,
          user.createdAt,
          user.status,
          user.role,
        ),
    )
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    })
    if (!updatedUser) return null

    return new User(
      updatedUser.id,
      updatedUser.name,
      updatedUser.username,
      updatedUser.email,
      updatedUser.password,
      updatedUser.createdAt,
      updatedUser.status,
      updatedUser.role,
    )
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id)
    return !!result
  }
}

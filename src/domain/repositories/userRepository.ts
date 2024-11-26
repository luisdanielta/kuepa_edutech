import { User } from "../entities/user"

export interface UserRepository {
  create(user: User): Promise<User>
  findById(id: string): Promise<User | null>
  findAll(): Promise<User[]>
  update(id: string, data: Partial<User>): Promise<User | null>
  delete(id: string): Promise<boolean>
}

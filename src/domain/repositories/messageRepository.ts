import { Message } from "../entities/message"

export interface MessageRepository {
  create(message: Message): Promise<Message>
  findById(id: string): Promise<Message | null>
  findAll(): Promise<Message[]>
  findByThread(threadId: string): Promise<Message[]>
  update(id: string, data: Partial<Message>): Promise<Message | null>
  delete(id: string): Promise<boolean>
}

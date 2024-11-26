import { MessageRepository } from "@/domain/repositories/messageRepository"
import { Message } from "@/domain/entities/message"

interface CreateMessageDTO {
  text: string
  sender: string
  thread?: string | null
}

export class MessageUseCases {
  constructor(private messageRepository: MessageRepository) {}

  async createMessage(data: CreateMessageDTO): Promise<Message> {
    const message = new Message(
      null,
      data.text,
      data.sender,
      data.thread || null,
      new Date(),
      [],
    )
    return this.messageRepository.create(message)
  }

  async getMessageById(id: string): Promise<Message | null> {
    return this.messageRepository.findById(id)
  }

  async getMessagesByThread(threadId: string): Promise<Message[]> {
    return this.messageRepository.findByThread(threadId)
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageRepository.findAll()
  }

  async updateMessage(
    id: string,
    data: Partial<Message>,
  ): Promise<Message | null> {
    return this.messageRepository.update(id, data)
  }

  async deleteMessage(id: string): Promise<boolean> {
    return this.messageRepository.delete(id)
  }
}

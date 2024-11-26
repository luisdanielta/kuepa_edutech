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
    if (!data.text.trim()) {
      throw new Error("Message text cannot be empty")
    }

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
    data: Partial<Pick<Message, "text" | "likes">>,
  ): Promise<Message | null> {
    if (data.text && !data.text.trim()) {
      throw new Error("Message text cannot be empty")
    }
    return this.messageRepository.update(id, data)
  }

  async deleteMessage(id: string): Promise<boolean> {
    const message = await this.getMessageById(id)
    if (!message) {
      throw new Error("Message not found")
    }
    return this.messageRepository.delete(id)
  }
}

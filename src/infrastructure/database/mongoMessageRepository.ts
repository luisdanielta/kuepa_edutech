import { MessageRepository } from "@/domain/repositories/messageRepository"
import { Message } from "@/domain/entities/message"
import { MessageModel, MessageDocument } from "./messageModel"

export class MongoMessageRepository implements MessageRepository {
  async create(message: Message): Promise<Message> {
    const createdMessage = await MessageModel.create(message)
    return this.mapDocumentToEntity(createdMessage)
  }

  async findById(id: string): Promise<Message | null> {
    const message = await MessageModel.findById(id)
      .populate("sender")
      .populate("thread")
    return message ? this.mapDocumentToEntity(message) : null
  }

  async findByThread(threadId: string): Promise<Message[]> {
    const messages = await MessageModel.find({ thread: threadId })
      .populate("sender")
      .sort("createdAt")
    return messages.map((message) => this.mapDocumentToEntity(message))
  }

  async findAll(): Promise<Message[]> {
    const messages = await MessageModel.find()
      .populate("sender")
      .sort("createdAt")
    return messages.map((message) => this.mapDocumentToEntity(message))
  }

  async update(id: string, data: Partial<Message>): Promise<Message | null> {
    const updatedMessage = await MessageModel.findByIdAndUpdate(id, data, {
      new: true,
    })
      .populate("sender")
      .populate("thread")
    return updatedMessage ? this.mapDocumentToEntity(updatedMessage) : null
  }

  async delete(id: string): Promise<boolean> {
    const result = await MessageModel.findByIdAndDelete(id)
    return !!result
  }

  private mapDocumentToEntity(message: MessageDocument): Message {
    return new Message(
      message.id,
      message.text,
      message.sender.toString(),
      message.senderName.toString(),
      message.thread ? message.thread.toString() : null,
      message.createdAt,
      message.likes.map((like) => like.toString()),
    )
  }
}

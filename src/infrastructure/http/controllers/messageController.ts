import { Request, Response } from "express"
import { MessageUseCases } from "@/application/message/messageUseCases"

export class MessageController {
  constructor(private messageUseCases: MessageUseCases) {}

  public create = async (req: Request, res: Response): Promise<void> => {
    const { text, thread } = req.body
    const sender = req.user?.id // Asume que `authenticateJWT` añade `user` al objeto `req`

    if (!text || !sender) {
      res.status(400).json({ message: "Text and sender are required" })
      return
    }

    const message = await this.messageUseCases.createMessage({
      text,
      sender,
      thread,
    })

    res.status(201).json(message)
  }

  public getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    const message = await this.messageUseCases.getMessageById(id)
    if (!message) {
      res.status(404).json({ message: "Message not found" })
      return
    }

    res.json(message)
  }

  public getByThread = async (req: Request, res: Response): Promise<void> => {
    const { threadId } = req.params

    const messages = await this.messageUseCases.getMessagesByThread(threadId)
    res.json(messages)
  }

  public getAll = async (_req: Request, res: Response): Promise<void> => {
    const messages = await this.messageUseCases.getAllMessages()
    res.json(messages)
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const data = req.body

    const updatedMessage = await this.messageUseCases.updateMessage(id, data)
    if (!updatedMessage) {
      res.status(404).json({ message: "Message not found" })
      return
    }

    res.json(updatedMessage)
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    const success = await this.messageUseCases.deleteMessage(id)
    if (!success) {
      res.status(404).json({ message: "Message not found" })
      return
    }

    res.status(204).send()
  }
}

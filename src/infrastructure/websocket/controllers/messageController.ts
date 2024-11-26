import { MessageUseCases } from "@/application/message/messageUseCases"

interface WebSocketMessagePayload {
  text: string
  sender: string
  thread?: string | null
}

export class WsMessageController {
  constructor(private messageUseCases: MessageUseCases) {}

  public createWebSocketMessage = async (payload: WebSocketMessagePayload) => {
    const { text, sender, thread } = payload

    const message = await this.messageUseCases.createMessage({
      text,
      sender,
      thread,
    })

    return message
  }
}

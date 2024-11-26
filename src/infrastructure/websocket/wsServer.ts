import WebSocket, { WebSocketServer } from "ws"
import jwt from "jsonwebtoken"
import http from "http"
import { IncomingMessage } from "http"
import { WsMessageController } from "./controllers/messageController"
import { MessageUseCases } from "@/application/message/messageUseCases"
import { MongoMessageRepository } from "@/infrastructure/database/mongoMessageRepository"

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"

// Define the decoded user structure from the JWT
interface DecodedUser {
  id: string
  username: string
  role: "user" | "moderator"
}

// Structure for incoming WebSocket messages
interface WebSocketMessage {
  action: "createMessage" // Extendable for future actions
  payload: {
    text: string
    thread?: string | null
  }
}

export class WSServer {
  private wss: WebSocketServer
  private messageController: WsMessageController

  constructor(server: http.Server) {
    this.wss = new WebSocketServer({ server })
    const messageRepository = new MongoMessageRepository()
    const messageUseCases = new MessageUseCases(messageRepository)
    this.messageController = new WsMessageController(messageUseCases)
    this.configureWebSocket()
  }

  private configureWebSocket(): void {
    this.wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
      // Extract JWT from query parameters
      const urlParams = new URLSearchParams(req.url?.replace("/", "") || "")
      const token = urlParams.get("token")

      if (!token) {
        ws.send(
          JSON.stringify({ status: "error", message: "No token provided" }),
        )
        ws.close()
        return
      }

      let user: DecodedUser
      try {
        user = jwt.verify(token, JWT_SECRET) as DecodedUser
      } catch (err) {
        ws.send(JSON.stringify({ status: `${err}`, message: "Invalid token" }))
        ws.close()
        return
      }

      console.log(`User connected: ${user.username}`)

      ws.on("message", async (message: WebSocket.RawData) => {
        try {
          const data: WebSocketMessage = JSON.parse(message.toString())
          await this.handleMessage(data, ws, user)
        } catch (err) {
          console.error("Failed to process WebSocket message:", err)
          ws.send(
            JSON.stringify({
              status: "error",
              message: "Failed to process message",
            }),
          )
        }
      })

      ws.on("close", () => {
        console.log(`User disconnected: ${user.username}`)
      })
    })
  }

  private async handleMessage(
    data: WebSocketMessage,
    ws: WebSocket,
    user: DecodedUser,
  ): Promise<void> {
    switch (data.action) {
      case "createMessage":
        await this.handleCreateMessage(data.payload, ws, user)
        break

      default:
        ws.send(JSON.stringify({ status: "error", message: "Unknown action" }))
    }
  }

  private async handleCreateMessage(
    payload: WebSocketMessage["payload"],
    ws: WebSocket,
    user: DecodedUser,
  ): Promise<void> {
    const { text, thread } = payload

    if (!text) {
      ws.send(JSON.stringify({ status: "error", message: "Text is required" }))
      return
    }

    try {
      const message = await this.messageController.createWebSocketMessage({
        text,
        sender: user.id,
        thread,
      })

      ws.send(JSON.stringify({ status: "success", message }))
    } catch (error) {
      console.error("Error creating message:", error)
      ws.send(
        JSON.stringify({
          status: "error",
          message: "Failed to create message",
        }),
      )
    }
  }
}

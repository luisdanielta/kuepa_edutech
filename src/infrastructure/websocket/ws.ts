import WebSocket from "ws"
import http from "http"
import { parse } from "url"
import jwt from "jsonwebtoken"
import { Message } from "@/domain/entities/message"

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"

// Define DecodedUser interface
interface DecodedUser {
  id: string
  username: string
  role: "user" | "moderator"
}

// WebSocket server class
export class WSServer {
  private wss: WebSocket.Server

  constructor(server: http.Server) {
    this.wss = new WebSocket.Server({ server, path: "/ws" })
    this.initialize()
  }

  // Initialize WebSocket connection and event handlers
  private initialize(): void {
    this.wss.on("connection", (ws, req) => this.handleConnection(ws, req))
  }

  // Handle incoming WebSocket connections
  private handleConnection(ws: WebSocket, req: http.IncomingMessage): void {
    const user = this.authenticateUser(req)
    if (!user) {
      ws.close(1008, "Invalid authentication token")
      return
    }

    console.log(`User connected: ${user.username}`)

    ws.on("message", (message) => this.handleIncomingMessage(ws, message, user))
    ws.on("close", () => console.log(`User disconnected: ${user.username}`))
  }

  // Authenticate user using token
  private authenticateUser(req: http.IncomingMessage): DecodedUser | null {
    const token = this.getTokenFromRequest(req)
    if (!token) return null

    try {
      return jwt.verify(token, JWT_SECRET) as DecodedUser
    } catch (error) {
      console.error("Token verification failed:", error)
      return null
    }
  }

  // Extract token from the WebSocket request
  private getTokenFromRequest(req: http.IncomingMessage): string | null {
    const urlParams = new URLSearchParams(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parse(req.url || "", true).query as any,
    )
    return urlParams.get("token") || null
  }

  // Handle incoming WebSocket messages based on the action
  private async handleIncomingMessage(
    ws: WebSocket,
    rawMessage: WebSocket.RawData,
    user: DecodedUser,
  ): Promise<void> {
    try {
      const { action, payload } = JSON.parse(rawMessage.toString())

      switch (action) {
        case "createMessage":
          await this.handleCreateMessage(payload, ws, user)
          break

        case "delete_message":
          this.handleDeleteMessage(payload, ws)
          break

        default:
          this.sendError(ws, "Unknown action")
      }
    } catch (error) {
      console.error("Failed to process WebSocket message:", error)
      this.sendError(ws, "Failed to process message")
    }
  }

  // Handle creating a new message
  private async handleCreateMessage(
    payload: { text: string },
    ws: WebSocket,
    user: DecodedUser,
  ): Promise<void> {
    const { text } = payload

    if (!text) {
      this.sendError(ws, "Text is required")
      return
    }

    const newMessage = new Message(null, text, user.id, null, new Date(), [])

    // Simulate saving to a database (replace with actual DB logic)
    console.log("Message created:", newMessage)

    // Broadcast the new message to all connected clients
    this.broadcast({ type: "new_message", payload: newMessage })
  }

  // Handle deleting a message
  private handleDeleteMessage(payload: { id: string }, ws: WebSocket): void {
    const { id } = payload

    if (!id) {
      this.sendError(ws, "Message ID is required")
      return
    }

    // Simulate deletion (replace with actual DB logic)
    console.log("Message deleted:", id)

    // Notify all clients about the deleted message
    this.broadcast({ type: "delete_message", payload: { id } })
  }

  // Send error response to the client
  private sendError(ws: WebSocket, message: string): void {
    ws.send(JSON.stringify({ type: "error", payload: { message } }))
  }

  // Broadcast messages to all connected clients
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private broadcast(data: { type: string; payload: any }): void {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data))
      }
    })
  }
}

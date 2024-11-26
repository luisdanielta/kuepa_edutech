import WebSocket from "ws"
import http from "http"
import { parse } from "url"
import jwt from "jsonwebtoken"

// WebSocket server class
export class WSServer {
  private wss: WebSocket.Server

  constructor(server: http.Server) {
    // Create WebSocket server
    this.wss = new WebSocket.Server({ server })

    // Handle incoming WebSocket connections
    this.wss.on("connection", (ws: WebSocket, req: http.IncomingMessage) => {
      console.log("New client connected")

      // Extract token from the query parameters of the connection URL
      const token = this.getTokenFromUrl(req.url)

      // Validate the token
      if (this.isValidToken(token)) {
        console.log("Valid token:", token)

        // Send a welcome message to the client
        ws.send("WebSocket connection established with authentication.")

        // Handle incoming messages from the client
        ws.on("message", (message: string) => {
          console.log("Received message:", message)
          ws.send(`Received message: ${message}`)
        })

        // Handle client disconnection
        ws.on("close", () => {
          console.log("Client disconnected")
        })
      } else {
        console.log("Invalid token")

        // Close the WebSocket connection if the token is invalid
        ws.close(1008, "Invalid authentication token")
      }
    })
  }

  // Extract the token from the URL query parameters
  private getTokenFromUrl(url?: string): string | undefined {
    if (!url) return undefined

    const parsedUrl = parse(url, true) // Parse URL and query parameters
    return parsedUrl.query.token as string | undefined
  }

  // Validate the token using JWT
  private isValidToken(token?: string): boolean {
    if (!token) return false

    try {
      // Verify the token using the secret key (replace 'your-secret-key' with your actual secret)
      jwt.verify(token, "your_jwt_secret_key")
      return true // If verification is successful, the token is valid
    } catch (error) {
      console.error("Token verification failed:", error)
      return false // If verification fails, the token is invalid
    }
  }
}

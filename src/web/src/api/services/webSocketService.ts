import { TokenStorage } from "@/utils/TokenStorage"
import { Endpoints } from "../endpoints" // Adjust the import path based on your project structure

export class WebSocketService {
  private static ws: WebSocket | null = null
  private static token: string | null = TokenStorage.getToken()

  // Initialize WebSocket connection
  public static connect(): void {
    if (!this.token) {
      console.error(
        "No token available. Cannot establish WebSocket connection.",
      )
      return
    }

    this.ws = new WebSocket(`${Endpoints.chat.websocket}?token=${this.token}`)

    this.ws.onopen = (): void => {
      console.log("WebSocket connection established.")
    }

    this.ws.onmessage = (event: MessageEvent): void => {
      console.log(event)
    }

    this.ws.onclose = (): void => {
      console.log("WebSocket connection closed.")
    }

    this.ws.onerror = (error: Event): void => {
      console.error("WebSocket error:", error)
    }
  }

  // Close WebSocket connection
  public static close(): void {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

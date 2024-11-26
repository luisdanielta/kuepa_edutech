import { TokenStorage } from "@/utils/tokenStorage"

const WS_URL = "ws://192.168.1.4:3000/ws"

// Event types handled by the WebSocket client
type EventType = "new_message" | "delete_message" | "error"

// Payload types for WebSocket events
interface EventPayloads {
  new_message: {
    id: string
    text: string
    sender: string
    senderName: string // Added sender's name
    thread: string | null
    createdAt: string
    likes: string[]
  }
  delete_message: { id: string }
  error: { message: string }
}

// WebSocketClient class for managing WebSocket connections
export class WebSocketClient {
  private socket: WebSocket | null = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private eventHandlers: Record<EventType, Array<(data: any) => void>> = {
    new_message: [],
    delete_message: [],
    error: [],
  }
  private token: string | null = null

  constructor() {
    this.token = TokenStorage.getToken()
  }

  // Connect to the WebSocket server
  public connect(): void {
    if (!this.token) {
      console.error("No token found for WebSocket connection.")
      return
    }

    this.socket = new WebSocket(`${WS_URL}?token=${this.token}`)

    this.socket.onopen = () => {
      console.log("WebSocket connected.")
    }

    this.socket.onmessage = (event: MessageEvent) => {
      const { type, payload } = JSON.parse(event.data)
      this.triggerEvent(type, payload)
    }

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    this.socket.onclose = () => {
      console.log("WebSocket disconnected.")
    }
  }

  // Close the WebSocket connection
  public disconnect(): void {
    if (this.socket) {
      this.socket.close()
    }
  }

  // Listen for WebSocket events
  public on<T extends EventType>(
    eventType: T,
    callback: (data: EventPayloads[T]) => void,
  ): void {
    if (!this.eventHandlers[eventType]) {
      this.eventHandlers[eventType] = []
    }
    this.eventHandlers[eventType].push(callback)
  }

  // Trigger event listeners for a specific event type
  private triggerEvent<T extends EventType>(
    eventType: T,
    data: EventPayloads[T],
  ): void {
    const handlers = this.eventHandlers[eventType] || []
    handlers.forEach((callback) => callback(data))
  }

  // Send a "createMessage" action to the WebSocket server
  public sendMessage({
    text,
    senderName,
  }: {
    text: string
    senderName: string
  }): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected.")
      return
    }

    const messageData = {
      action: "createMessage",
      payload: { text, senderName },
    }

    this.socket.send(JSON.stringify(messageData))
  }

  // Send a "delete_message" action to the WebSocket server
  public deleteMessage(id: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected.")
      return
    }

    const messageData = {
      action: "delete_message",
      payload: { id },
    }

    this.socket.send(JSON.stringify(messageData))
  }
}

// Singleton instance of WebSocketClient
const wsClient = new WebSocketClient()
export default wsClient

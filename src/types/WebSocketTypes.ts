// Define allowed WebSocket actions
export type WebSocketAction =
  | "createMessage"
  | "startVideoStream"
  | "stopVideoStream"

// Define payload structure for "createMessage" action
export interface CreateMessagePayload {
  text: string
  thread?: string | null
}

// Define payload structure for "startVideoStream" action
export interface StartVideoStreamPayload {
  streamId: string // Unique stream identifier
  videoData: string // Encoded video data
}

// Define payload structure for "stopVideoStream" action
export interface StopVideoStreamPayload {
  streamId: string // Stream ID to stop
}

// Generic WebSocket message structure
export interface WebSocketMessage<T> {
  action: WebSocketAction
  payload: T
}

// Mapping WebSocket actions to their payload types
export type WebSocketPayloads = {
  createMessage: CreateMessagePayload
  startVideoStream: StartVideoStreamPayload
  stopVideoStream: StopVideoStreamPayload
}

// Message.ts (or another suitable file for the interface)
export interface Message {
  id: string
  text: string
  sender: string // User ID or you can replace with a full User object if needed
  senderName: string // Sender's display name
  thread: string | null // Parent thread message ID or null for standalone messages
  createdAt: Date
  likes: string[] // Array of User IDs who liked this message
}

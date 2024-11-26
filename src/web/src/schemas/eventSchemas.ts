import { z } from "zod"

// Schema for a message
export const messageSchema = z.object({
  id: z.string().nullable(),
  text: z.string(),
  sender: z.string(),
  thread: z.string().nullable(),
  createdAt: z.string().transform((date) => new Date(date)),
  likes: z.array(z.string()).optional(),
})

// Schema for delete_message event
export const deleteMessageSchema = z.object({
  id: z.string(),
})

// Combine schemas into an event schema map
export const eventSchemas = {
  new_message: messageSchema,
  delete_message: deleteMessageSchema,
}

export type WebSocketEvents = {
  new_message: z.infer<typeof messageSchema>
  delete_message: z.infer<typeof deleteMessageSchema>
}

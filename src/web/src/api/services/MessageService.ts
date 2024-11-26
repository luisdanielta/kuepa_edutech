import { ApiClient } from "../clients/apiClient"
import { Endpoints } from "../endpoints"
import { TokenStorage } from "../../utils/tokenStorage"
import { Message } from "@/domain/entities/Message"

const apiClient = ApiClient.getInstance()

export const MessageService = {
  // Fetches all messages for a given thread (GET /msg)
  getMessages: async (threadId: string): Promise<Message[]> => {
    try {
      const response = await apiClient.request<{ messages: Message[] }>(
        `${Endpoints.chat.messages}/thread/${threadId}`,
        {
          method: "GET",
        },
      )
      return response.data.messages
    } catch (error) {
      console.error("Error fetching messages:", error)
      throw new Error("Failed to fetch messages")
    }
  },

  // Creates a new message (POST /msg)
  createMessage: async (text: string, threadId: string): Promise<Message> => {
    try {
      const token = TokenStorage.getToken()
      if (!token) throw new Error("User not authenticated")

      const response = await apiClient.request<{ message: Message }>(
        Endpoints.chat.messages,
        {
          method: "POST",
          body: {
            text,
            thread: threadId,
          },
          headers: {
            Authorization: `Bearer ${token}`, // Ensure to send token in Authorization header
          },
        },
      )

      return response.data.message
    } catch (error) {
      console.error("Error creating message:", error)
      throw new Error("Failed to create message")
    }
  },
}

import React, { createContext, useState, useEffect } from "react"
import wsClient from "@/api/clients/wsClient"
import { Message } from "@/domain/entities/Message"

// Define the structure of the MessagesContext
interface MessagesContextType {
  messages: Message[] // Stores the list of messages
  addMessage: (newMessage: Message) => void // Adds a new message to the list
  removeMessage: (messageId: string) => void // Removes a message by ID
}

// Create the MessagesContext
const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined,
)

// Provider component for MessagesContext
export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([])

  // Add a new message to the state
  const addMessage = (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage])
  }

  // Remove a message from the state by its ID
  const removeMessage = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId),
    )
  }

  useEffect(() => {
    // Connect to WebSocket
    wsClient.connect()

    // Listen for new messages
    const handleNewMessage = (data: {
      id: string
      text: string
      sender: string
      senderName: string | null
      thread: string | null
      createdAt: string
      likes: string[]
    }) => {
      const newMessage: Message = {
        id: data.id,
        text: data.text,
        sender: data.sender,
        senderName: data.senderName || "Unknown",
        thread: data.thread,
        createdAt: new Date(data.createdAt),
        likes: data.likes,
      }
      addMessage(newMessage)
    }

    // Listen for message deletions
    const handleDeleteMessage = (data: { id: string }) => {
      removeMessage(data.id)
    }

    // Subscribe to WebSocket events
    wsClient.on("new_message", handleNewMessage)
    wsClient.on("delete_message", handleDeleteMessage)

    // Cleanup on component unmount
    return () => {
      wsClient.disconnect()
    }
  }, [])

  return (
    <MessagesContext.Provider value={{ messages, addMessage, removeMessage }}>
      {children}
    </MessagesContext.Provider>
  )
}

export default MessagesContext

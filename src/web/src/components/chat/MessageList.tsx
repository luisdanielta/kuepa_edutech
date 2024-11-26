import React from "react"
import MessageComponent from "./Message"
import { useUserContext } from "@/hooks/useUserContext" // Import the UserContext for current user info
import { useMessages } from "@/hooks/useMessagesContext"

export const MessageList: React.FC = () => {
  const { messages } = useMessages()
  const { user } = useUserContext() // Access current user details

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length > 0 ? (
        messages.map((message) => (
          <MessageComponent
            key={message.id || Math.random()} // Ensure unique keys even if `id` is null
            senderId={message.sender}
            senderName={message.senderName || "Unknown"} // Fallback for missing sender name
            currentUserId={user?.id || ""} // Current user ID
            text={message.text}
            timestamp={new Date(message.createdAt).toLocaleString()} // Properly formatted timestamp
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No messages yet</p>
      )}
    </div>
  )
}

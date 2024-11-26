import React from "react"

interface MessageProps {
  senderId: string // Unique identifier for the sender
  senderName: string // Display name of the sender
  currentUserId: string // Unique identifier for the current user
  text: string // Message text content
  timestamp: string // Timestamp of when the message was created
}

const MessageComponent: React.FC<MessageProps> = ({
  senderId,
  senderName,
  currentUserId,
  text,
  timestamp,
}) => {
  const isSelf = senderId === currentUserId // Check if the message is from the current user

  return (
    <div className={`flex ${isSelf ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex flex-col space-y-1 ${
          isSelf ? "items-end" : "items-start"
        }`}
      >
        <span className="text-sm font-medium text-gray-800">
          {isSelf ? "You" : senderName} {/* Display "You" for current user */}
        </span>
        <div
          className={`inline-block rounded-lg px-4 py-2 text-sm shadow-sm ${
            isSelf ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          {text}
        </div>
        <span className="text-xs text-gray-500">{timestamp}</span>{" "}
        {/* Show formatted timestamp */}
      </div>
    </div>
  )
}

export default MessageComponent

import React from "react"

interface MessageProps {
  user: string
  text: string
  timestamp: string
}

const MessageComponent: React.FC<MessageProps> = ({
  user,
  text,
  timestamp,
}) => {
  const isSelf = user === "You" // Example condition for aligning messages
  return (
    <div className={`flex ${isSelf ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex flex-col space-y-1 ${
          isSelf ? "items-end" : "items-start"
        }`}
      >
        <span className="text-sm font-medium text-gray-800">{user}</span>
        <div
          className={`inline-block rounded-lg px-4 py-2 text-sm shadow-sm ${
            isSelf ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          {text}
        </div>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
    </div>
  )
}

export default MessageComponent

import React from "react"
import { MessageList } from "./MessageList"
import { MessageForm } from "./MessageForm"
import { Button } from "@/components/ui/button"

export default function ChatBox() {
  return (
    <div className="flex flex-col h-full border-t md:border-t-0 md:border-r border-gray-300 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h1 className="text-lg font-bold">Chat</h1>
        <Button variant="outline" size="sm">
          Clear Chat
        </Button>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <MessageList />
        <MessageForm />
      </div>
    </div>
  )
}

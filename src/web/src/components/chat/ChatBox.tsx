import React from "react"
import { MessageList } from "./MessageList"
import { MessageForm } from "./MessageForm"

export default function ChatBox() {
  return (
    <div className="flex flex-col h-full border-t md:border-t-0 md:border-r border-gray-300 bg-white shadow-sm">
      <h1 className="text-lg font-bold p-4 border-b">Chat</h1>
      <div className="flex flex-col flex-1 overflow-hidden">
        <MessageList />
        <MessageForm />
      </div>
    </div>
  )
}

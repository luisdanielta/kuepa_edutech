import React, { useState } from "react"
import { MessageList } from "./MessageList"
import { MessageForm } from "./MessageForm"
import { Button } from "@/components/ui/button"
import { MessagesProvider } from "@/context/MessagesContext" // Import MessagesProvider and hook
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
  ToastClose,
} from "@/components/ui/Toast" // Import the Toast components

export default function ChatBox() {
  const [showToast, setShowToast] = useState(false) // Manage Toast visibility

  const handleClearChat = () => {
    setShowToast(true) // Show the confirmation Toast
  }

  return (
    <ToastProvider>
      <div className="flex flex-col h-full border-t md:border-t-0 md:border-r border-gray-300 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h1 className="text-lg font-bold">Chat</h1>
          <Button variant="outline" size="sm" onClick={handleClearChat}>
            Clear Chat
          </Button>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <MessagesProvider>
            {/* Message List */}
            <div className="flex-1 overflow-y-auto">
              <MessageList />
            </div>

            {/* Message Form */}
            <MessageForm />
          </MessagesProvider>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast open={showToast} onOpenChange={setShowToast}>
        <ToastTitle>Chat Cleared</ToastTitle>
        <ToastDescription>
          All messages have been successfully cleared.
        </ToastDescription>
        <ToastClose />
      </Toast>

      <ToastViewport />
    </ToastProvider>
  )
}

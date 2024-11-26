import React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { messageSchema } from "@/schemas/messageSchema"
import wsClient from "@/api/clients/wsClient"

type MessageFormValues = z.infer<typeof messageSchema>

interface MessageFormProps {
  threadId?: string // Optional thread ID for replies
  onMessageSent?: () => void // Callback after sending a message
}

export const MessageForm: React.FC<MessageFormProps> = ({
  threadId,
  onMessageSent,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: { threadId },
  })

  const onSubmit = async (data: MessageFormValues) => {
    try {
      // Send the message using WebSocket
      wsClient.sendMessage({ text: data.text, senderName: "You" }) // Add senderName for display purposes

      // Trigger the callback if provided
      if (onMessageSent) {
        onMessageSent()
      }

      // Reset the form after successful submission
      reset()
    } catch (error) {
      console.error("Error sending message:", error)
      setError("text", {
        type: "manual",
        message: "Failed to send the message. Please try again later.",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-2">
      <Textarea
        {...register("text")}
        placeholder="Write your message..."
        className="flex-1"
      />
      {errors.text && (
        <p className="text-red-500 text-sm">{errors.text.message}</p>
      )}
      <Button type="submit">Send</Button>
    </form>
  )
}

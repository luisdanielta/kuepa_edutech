import React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { messageSchema } from "@/schemas/messageSchema"
import { MessageService } from "@/api/services/MessageService" // Import the MessageService

type MessageFormValues = z.infer<typeof messageSchema>

interface MessageFormProps {
  threadId?: string
  onMessageSent?: () => void
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
  } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: { threadId },
  })

  const onSubmit = async (data: MessageFormValues) => {
    try {
      // Call the MessageService to create the message
      const newMessage = await MessageService.createMessage(
        data.text,
        threadId || "",
      )

      // If the callback is provided, trigger it
      if (onMessageSent) {
        onMessageSent()
      }

      // Clear form or show success message
      console.log("Message sent successfully:", newMessage)
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
        placeholder="Escribe tu mensaje..."
        className="flex-1"
      />
      {errors.text && (
        <p className="text-red-500 text-sm">{errors.text.message}</p>
      )}
      <Button type="submit">Enviar</Button>
    </form>
  )
}

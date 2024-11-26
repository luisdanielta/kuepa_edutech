import React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { messageSchema } from "@/schemas/messageSchema"

type MessageFormValues = z.infer<typeof messageSchema>

interface MessageFormProps {
  threadId?: string
  // onMessageSent?: () => void
}

export const MessageForm: React.FC<MessageFormProps> = ({ threadId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: { threadId },
  })

  const onSubmit = async () => {}

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

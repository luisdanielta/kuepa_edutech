import { z } from "zod"

export const messageSchema = z.object({
  text: z
    .string()
    .min(1, { message: "El mensaje no puede estar vacío." })
    .max(500, { message: "El mensaje no puede exceder los 500 caracteres." }),
  threadId: z.string().optional(),
})

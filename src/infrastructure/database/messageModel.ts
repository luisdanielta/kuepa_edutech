import mongoose, { Schema, Document } from "mongoose"

export interface MessageDocument extends Document {
  text: string
  sender: string
  thread: string | null
  createdAt: Date
  likes: string[]
}

const MessageSchema = new Schema({
  text: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  thread: { type: Schema.Types.ObjectId, ref: "Message", default: null },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
})

export const MessageModel = mongoose.model<MessageDocument>(
  "Message",
  MessageSchema,
)

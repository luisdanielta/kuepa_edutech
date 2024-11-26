import mongoose, { Schema, Document } from "mongoose"

export interface UserDocument extends Document {
  name: string
  username: string
  email: string
  password: string
  createdAt: Date
  status: boolean
  role: "user" | "moderator"
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
  role: { type: String, enum: ["user", "moderator"], default: "user" },
})

export const UserModel = mongoose.model<UserDocument>("User", UserSchema)

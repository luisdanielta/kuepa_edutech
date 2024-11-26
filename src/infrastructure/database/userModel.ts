import mongoose, { Schema, Document } from "mongoose"

export interface UserDocument extends Document {
  name: string
  username: string
  email: string
  password: string
  createdAt: Date
  status: boolean
  role: string
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
})

export const UserModel = mongoose.model<UserDocument>("User", UserSchema)

import mongoose from "mongoose"

export class Database {
  private static instance: Database
  private isConnected = false

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  async connect(uri: string, user?: string, password?: string): Promise<void> {
    if (this.isConnected) {
      console.log("Already connected to MongoDB.")
      return
    }

    const options: mongoose.ConnectOptions = {}
    if (user && password) {
      options.auth = { username: user, password: password }
    }

    try {
      await mongoose.connect(uri, options)
      this.isConnected = true
      console.log("Connected to MongoDB.")
    } catch (error) {
      console.error("Error connecting to MongoDB:", error)
      process.exit(1)
    }
  }

  disconnect(): void {
    if (!this.isConnected) return

    mongoose.disconnect()
    this.isConnected = false
    console.log("Disconnected from MongoDB.")
  }
}

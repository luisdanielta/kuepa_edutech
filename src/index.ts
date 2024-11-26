import express from "express"
import dotenv from "dotenv"
import { Database } from "@/infrastructure/database/conn"
import AuthRouter from "@/infrastructure/http/routes/authRoutes"

// Load environment variables
dotenv.config()

const PORT = process.env.PORT || 3000
const uri = process.env.MONGODB_URI!
const user = process.env.MONGODB_USER!
const password = process.env.MONGODB_PASS!

async function bootstrap() {
  try {
    // Mock database connection (replace with real connection logic)
    const db = Database.getInstance()
    await db.connect(uri, user, password)

    const app = express()

    // Middlewares
    app.use(express.json()) // Parse JSON payloads
    app.use(express.urlencoded({ extended: true })) // Parse URL-encoded payloads

    // Register routes
    app.use("/v1/api/auth", AuthRouter)

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error("Error bootstrapping the server:", error)
    process.exit(1)
  }
}

bootstrap()

import express, { Application } from "express"
import http, { Server as HTTPServer } from "http"
import dotenv from "dotenv"
import { Database } from "@/infrastructure/database/conn"
import AuthRouter from "@/infrastructure/http/routes/authRoutes"
import MessageRouter from "@/infrastructure/http/routes/messageRoutes"
import cors from "cors"
import { WSServer } from "@/infrastructure/websocket/ws"

dotenv.config()

const PORT = process.env.PORT || 3000
const uri = process.env.MONGODB_URI!
const user = process.env.MONGODB_USER!
const password = process.env.MONGODB_PASS!

export class ServerApp {
  private app: Application
  private server: HTTPServer
  private wsServer: WSServer

  constructor() {
    this.app = express()
    this.server = http.createServer(this.app) // HTTP Server
    this.wsServer = new WSServer(this.server)

    this.configureMiddlewares()
    this.configureRoutes()
  }

  private configureMiddlewares(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    this.app.use(
      cors({
        origin: true,
        allowedHeaders: ["Content-Type", "Authorization", "authorization"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        preflightContinue: false,
      }),
    )

    this.app.options("*", cors())
  }

  private configureRoutes(): void {
    this.app.use("/v1/api/auth", AuthRouter) // Authentication Routes
    this.app.use("/v1/api/msg", MessageRouter) // Message REST API Routes
  }

  public async start(): Promise<void> {
    try {
      const db = Database.getInstance()
      await db.connect(uri, user, password) // Connect to the database

      this.server.listen(PORT, () => {
        console.log(`HTTP and WebSocket server running on port ${PORT}`)
      })
    } catch (error) {
      console.error(`Error starting server: ${error}`)
    }
  }
}

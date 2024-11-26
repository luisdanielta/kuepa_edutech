import { ServerApp } from "@/infrastructure/http/server"

async function bootstrap() {
  try {
    const app = new ServerApp()
    await app.start()
    console.log("Server started successfully.")
  } catch (error) {
    console.error("Error bootstrapping the app:", error)
    process.exit(1)
  }
}

bootstrap()

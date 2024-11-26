import { Router } from "express"
import { MessageController } from "../controllers/messageController"
import { MessageUseCases } from "@/application/message/messageUseCases"
import { MongoMessageRepository } from "@/infrastructure/database/mongoMessageRepository"
import { authenticateJWT } from "../middleware/authMiddleware"
import { authorizeRoles } from "../middleware/roleMiddleware"
import { asyncHandler } from "../middleware/asyncHandler"

const MessageRouter = Router()

const messageRepository = new MongoMessageRepository()
const messageUseCases = new MessageUseCases(messageRepository)
const messageController = new MessageController(messageUseCases)

// Users with "moderator" or "user" roles can create messages
MessageRouter.post(
  "/",
  authenticateJWT,
  authorizeRoles(["moderator", "user"]),
  asyncHandler(messageController.create),
)

// All users with "moderator" role can view all messages
MessageRouter.get(
  "/",
  authenticateJWT,
  authorizeRoles(["moderator"]),
  asyncHandler(messageController.getAll),
)

// Fetch a specific message by ID
MessageRouter.get(
  "/:id",
  authenticateJWT,
  authorizeRoles(["moderator", "user"]),
  asyncHandler(messageController.getById),
)

// Fetch messages by thread ID
MessageRouter.get(
  "/thread/:threadId",
  authenticateJWT,
  authorizeRoles(["moderator", "user"]),
  asyncHandler(messageController.getByThread),
)

// Update a message
MessageRouter.put(
  "/:id",
  authenticateJWT,
  authorizeRoles(["moderator"]),
  asyncHandler(messageController.update),
)

// Delete a message
MessageRouter.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles(["moderator"]),
  asyncHandler(messageController.delete),
)

export default MessageRouter

import { AuthenticatedUser } from "./user"

declare global {
  namespace Express {
    export interface Request {
      user?: AuthenticatedUser
    }
  }
}

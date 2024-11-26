export interface AuthenticatedUser {
  id: string
  username: string
  role: "user" | "moderator"
}

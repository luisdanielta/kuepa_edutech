// Represents a user in the system with defined roles
export class User {
  constructor(
    public readonly id: string | null,
    public readonly name: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly createdAt: Date,
    public readonly status: boolean = true,
    public readonly role: "user" | "moderator" = "user", // Restricting roles
  ) {}
}

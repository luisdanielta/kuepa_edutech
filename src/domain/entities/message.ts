export class Message {
  constructor(
    public readonly id: string | null,
    public readonly text: string,
    public readonly sender: string, // Reference to User ID
    public readonly senderName: string, // Reference to User ID
    public readonly thread: string | null = null, // Reference to parent Message ID (for threads)
    public readonly createdAt: Date,
    public readonly likes: string[] = [], // Array of User IDs who liked this message
  ) {}
}

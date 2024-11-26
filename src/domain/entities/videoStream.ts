// VideoStream class to manage video stream data
export class VideoStream {
  constructor(
    public readonly streamId: string, // Unique identifier for the stream
    public readonly userId: string, // ID of the user streaming
    public videoData: string, // Encoded video data in a string format (base64 or other)
    public isActive: boolean = true, // Stream status (active/inactive)
  ) {}

  // Update the stream data
  updateStreamData(videoData: string): void {
    this.videoData = videoData
  }

  // Stop the stream (set isActive to false)
  stopStream(): void {
    this.isActive = false
  }
}

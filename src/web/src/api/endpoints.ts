export const Endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
  },
  chat: {
    messages: "/msg", // REST API endpoint for fetching messages
    websocket: "ws://localhost:3000/ws", // WebSocket endpoint for real-time communication
  },
}

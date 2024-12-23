import React from "react"
import ChatBox from "../components/chat/ChatBox"
import ModeratorBox from "../components/ModeratorBox"

export default function HomePage() {
  return (
    <div className="flex flex-col-reverse md:flex-row h-screen">
      <div className="h-1/3 md:h-full md:max-w-sm">
        <ChatBox />
      </div>
      <div className="flex-1">
        <ModeratorBox />
      </div>
    </div>
  )
}

import React from "react"
import { useAppContext } from "@/hooks/useAppContext"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ModeratorBox() {
  const { title, setTitle, logout } = useAppContext()

  return (
    <div className="flex flex-col h-full border-t md:border-t-0 md:border-r border-gray-300 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h1 className="text-lg font-bold">{title}</h1>
        <div className="flex items-center space-x-2">
          {/* Edit Title Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Edit Title
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Title</DialogTitle>
                <DialogDescription>
                  Change the title for the Moderator Box.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <label className="text-sm font-medium">
                  Title
                  <input
                    type="text"
                    defaultValue={title}
                    onBlur={(e) => setTitle(e.target.value)}
                    className="mt-2 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </label>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Logout Button */}
          <Button variant="destructive" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex items-center justify-center bg-gray-200">
        <iframe
          width="800"
          height="450"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your desired YouTube video URL
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full object-cover"
        ></iframe>
      </div>
    </div>
  )
}

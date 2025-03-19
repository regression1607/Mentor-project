"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { getOrCreateChat } from "@/actions/chat-actions"
import { useSession } from "next-auth/react"

export function StartChatButton({ userId, className }: { userId: string; className?: string }) {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const handleStartChat = async () => {
    if (!session) {
      router.push("/auth/signin")
      return
    }

    setLoading(true)

    try {
      const result = await getOrCreateChat(userId)

      if (result.success) {
        // Determine the correct path based on user role
        const basePath = session.user.role === "mentor" ? "/dashboard/mentor/chats" : "/dashboard/mentee/chats"

        router.push(`${basePath}/${result.chatId}`)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to start chat",
        })
      }
    } catch (error) {
      console.error("Error starting chat:", error)
      toast({
        title: "Error",
        description: "Failed to start chat",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleStartChat} disabled={loading} variant="outline" className={className}>
      <MessageSquare className="h-4 w-4 mr-2" />
      {loading ? "Starting chat..." : "Message"}
    </Button>
  )
}


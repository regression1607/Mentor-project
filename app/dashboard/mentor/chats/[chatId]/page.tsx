import { ChatInterface } from "@/components/chat/chat-interface"

export default function MentorChatPage({ params }: { params: { chatId: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="hidden md:block">
          <h1 className="text-3xl font-bold mb-8">Messages</h1>
        </div>
        <div className="md:col-span-2">
          <ChatInterface chatId={params.chatId} basePath="/dashboard/mentor/chats" />
        </div>
      </div>
    </div>
  )
}


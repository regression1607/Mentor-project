import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export function ChatListShadow(){
    return (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
            <p className="text-muted-foreground">
              When you start chatting with mentors or mentees, your conversations will appear here.
            </p>
          </CardContent>
        </Card>
      )
}


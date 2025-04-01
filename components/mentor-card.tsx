import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Mentor = {
  id: string;
  name: string;
  title: string;
  image?: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  pricing: {
    chat: number;
    video: number;
    call: number;
  };
};

export function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={mentor.image || "/placeholder.svg"}
            alt={mentor.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
          <p className="text-gray-600 mb-3">{mentor.title}</p>

          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 font-medium">{mentor.rating}</span>
            <span className="text-gray-500 ml-1">
              ({mentor.reviewCount} reviews)
            </span>
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {mentor.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-2 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-500">Chat</p>
              <p className="font-semibold">${mentor.pricing.chat}/hr</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-500">Video</p>
              <p className="font-semibold">${mentor.pricing.video}/hr</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-500">Call</p>
              <p className="font-semibold">${mentor.pricing.call}/hr</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/mentors/${mentor.id}`} className="w-full">
          <Button className="w-full">View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

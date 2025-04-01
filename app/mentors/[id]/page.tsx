import Image from "next/image";
import { Star, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SessionBooking from "@/components/booking/session-booking";
import { StartChatButton } from "@/components/chat/start-chat-button";
import { getMentorById } from "@/lib/mentors";
import { notFound } from "next/navigation";
// import { WoSessionBooking } from "@/components/booking/wo-state-session-booking"

export default async function MentorProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("id from params", id);
  const mentor = await getMentorById(id);
  if (!mentor) {
    notFound();
  }

  // Mock reviews data - in a real app, this would come from a database
  const reviews = [
    {
      id: 1,
      user: "Jane Smith",
      rating: 5,
      date: "October 15, 2023",
      comment:
        "This mentor was incredibly helpful in guiding me through complex concepts. Their explanations were clear and they provided practical examples that helped me understand.",
    },
    {
      id: 2,
      user: "Michael Brown",
      rating: 5,
      date: "September 28, 2023",
      comment:
        "I had a great session discussing best practices. They shared valuable insights from their experience that I've already started implementing in my projects.",
    },
    {
      id: 3,
      user: "Sarah Lee",
      rating: 4,
      date: "August 10, 2023",
      comment:
        "They provided excellent career advice and helped me prepare for my interviews. Their feedback on my resume was particularly helpful.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Mentor Info */}
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="relative h-64 w-64 rounded-lg overflow-hidden">
              <Image
                src={mentor.image || "/placeholder.svg?height=400&width=400"}
                alt={mentor.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{mentor.name}</h1>
              <p className="text-gray-600 mb-4">{mentor.title}</p>

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
              <div className="flex gap-3">
                <StartChatButton otherUserId={mentor.userId} />
              </div>
            </div>
          </div>

          <Tabs defaultValue="about" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{mentor.about}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {mentor.education.map((edu, index) => (
                      <li key={index} className="flex justify-between">
                        <div>
                          <p className="font-medium">{edu.institution}</p>
                          <p className="text-gray-600">{edu.degree}</p>
                        </div>
                        <span className="text-gray-500">{edu.year}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    {mentor.experience.map((exp, index) => (
                      <li key={index} className="flex justify-between">
                        <div>
                          <p className="font-medium">{exp.role}</p>
                          <p className="text-gray-600">{exp.company}</p>
                        </div>
                        <span className="text-gray-500">{exp.period}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Client Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    {reviews.map((review) => (
                      <li
                        key={review.id}
                        className="border-b pb-6 last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between mb-2">
                          <p className="font-medium">{review.user}</p>
                          <span className="text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Booking */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Book a Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <SessionBooking mentor={mentor} />
              {/* <WoSessionBooking mentor={mentor} /> */}
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" /> Availability
                </h3>
                <ul className="space-y-3">
                  {mentor.availability.map((avail, index) => (
                    <li key={index} className="text-sm">
                      <span className="font-medium">{avail.day}:</span>{" "}
                      {avail.slots.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

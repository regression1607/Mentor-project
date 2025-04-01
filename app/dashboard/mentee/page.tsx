import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle, Phone, Video } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "@/components/search/search-bar";

export default function MenteeDashboard() {
  // Mock data - in a real app, this would come from a database
  const upcomingSessions = [
    {
      id: 1,
      mentor: {
        id: 1,
        name: "Alex Johnson",
        image: "/placeholder.svg?height=200&width=200",
        title: "Senior Software Engineer",
      },
      type: "video",
      date: "Mar 15, 2025",
      time: "10:00 AM - 11:00 AM",
      status: "confirmed",
    },
    {
      id: 2,
      mentor: {
        id: 2,
        name: "Sarah Williams",
        image: "/placeholder.svg?height=200&width=200",
        title: "Product Manager",
      },
      type: "chat",
      date: "Mar 18, 2025",
      time: "2:00 PM - 3:00 PM",
      status: "pending",
    },
  ];

  const pastSessions = [
    {
      id: 3,
      mentor: {
        id: 1,
        name: "Alex Johnson",
        image: "/placeholder.svg?height=200&width=200",
        title: "Senior Software Engineer",
      },
      type: "video",
      date: "Mar 5, 2025",
      time: "11:00 AM - 12:00 PM",
      status: "completed",
      rated: true,
    },
    {
      id: 4,
      mentor: {
        id: 3,
        name: "Michael Chen",
        image: "/placeholder.svg?height=200&width=200",
        title: "Data Scientist",
      },
      type: "call",
      date: "Feb 28, 2025",
      time: "3:00 PM - 4:00 PM",
      status: "completed",
      rated: false,
    },
  ];

  const recommendedMentors = [
    {
      id: 4,
      name: "Emily Rodriguez",
      image: "/placeholder.svg?height=200&width=200",
      title: "UX Designer",
      rating: 4.8,
      specialties: ["UI/UX", "Design Systems", "User Research"],
    },
    {
      id: 5,
      name: "David Kim",
      image: "/placeholder.svg?height=200&width=200",
      title: "Marketing Director",
      rating: 4.9,
      specialties: ["Digital Marketing", "SEO", "Content Strategy"],
    },
    {
      id: 6,
      name: "Lisa Patel",
      image: "/placeholder.svg?height=200&width=200",
      title: "Frontend Developer",
      rating: 4.7,
      specialties: ["React", "CSS", "Accessibility"],
    },
  ];

  const getSessionIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "chat":
        return <MessageCircle className="h-4 w-4" />;
      case "call":
        return <Phone className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Cancelled
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mentee Dashboard</h1>

      <div className="mb-8">
        <SearchBar
          className="max-w-xl"
          placeholder="Search for mentors by skill, industry, or name..."
        />
      </div>

      <Tabs defaultValue="upcoming" className="mb-8">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <Image
                            src={session.mentor.image || "/placeholder.svg"}
                            alt={session.mentor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{session.mentor.name}</h3>
                          <p className="text-sm text-gray-500">
                            {session.mentor.title}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {session.date}, {session.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          {getSessionIcon(session.type)}
                        </div>
                        {getStatusBadge(session.status)}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center mt-4">
                    <Button asChild>
                      <Link href="/mentors">Book More Sessions</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-4">No upcoming sessions</p>
                  <Button asChild>
                    <Link href={"/mentors"}> Find a Mentor</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Past Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {pastSessions.length > 0 ? (
                <div className="space-y-4">
                  {pastSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <Image
                            src={session.mentor.image || "/placeholder.svg"}
                            alt={session.mentor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{session.mentor.name}</h3>
                          <p className="text-sm text-gray-500">
                            {session.mentor.title}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {session.date}, {session.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          {getSessionIcon(session.type)}
                        </div>
                        {!session.rated && (
                          <Button size="sm">Leave Review</Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Notes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">
                  No past sessions
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Recommended Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedMentors.map((mentor) => (
            <Card key={mentor.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image
                        src={mentor.image || "/placeholder.svg"}
                        alt={mentor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{mentor.name}</h3>
                      <p className="text-sm text-gray-500">{mentor.title}</p>
                      <div className="flex items-center mt-1">
                        <svg
                          className="h-4 w-4 text-yellow-500 fill-yellow-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span className="ml-1 text-sm">{mentor.rating}</span>
                      </div>
                    </div>
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

                  <Link href={`/mentors/${mentor.id}`}>
                    <Button className="w-full">View Profile</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

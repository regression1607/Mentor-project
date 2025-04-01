import { redirect } from "next/navigation";
import Image from "next/image";
// import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUserProfile } from "@/actions/profile-actions";
import { auth } from "@/lib/auth";
import Link from "next/link";
// import {  } from "@/lib/utils";

export default async function ProfilePage() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const profile = await getUserProfile();
  if (!profile) {
    redirect("/auth/signin");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4 bg-gray-100">
                {profile.user.image ? (
                  <Image
                    src={profile.user.image || "/placeholder.svg"}
                    alt={profile.user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary text-4xl">
                    {profile.user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <CardTitle className="text-2xl">{profile.user.name}</CardTitle>
              <CardDescription>{profile.user.email}</CardDescription>
              <Badge className="mt-2">
                {profile.user.role === "mentor" ? "Mentor" : "Mentee"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
                {profile.user.role === "user" && (
                  <Button variant="outline" className="w-full">
                    Become a Mentor
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Member Since
                </h3>
                <p>{profile.user.createdAt}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Account Status
                </h3>
                <Badge variant="outline" className="mt-1">
                  Active
                </Badge>
              </div>
              <Separator />
              <div className="pt-2">
                <Button
                  variant="outline"
                  className="w-full text-destructive hover:text-destructive"
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="sessions">
            <TabsList className="mb-6">
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              {profile.user.role === "mentor" && (
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              )}
            </TabsList>

            {/* Sessions Tab */}
            <TabsContent value="sessions">
              <Card>
                <CardHeader>
                  <CardTitle>Session History</CardTitle>
                  <CardDescription>
                    All your past and upcoming sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {profile.sessions.length > 0 ? (
                    <div className="space-y-4">
                      {profile.sessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex justify-between items-center p-4 border rounded-lg"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">
                                {profile.user.role === "mentor"
                                  ? `Session with ${session.menteeName}`
                                  : `Session with ${session.mentorName}`}
                              </h3>
                              <Badge
                                className={
                                  session.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : session.status === "confirmed"
                                    ? "bg-blue-100 text-blue-800"
                                    : session.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {session.status.charAt(0).toUpperCase() +
                                  session.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              {session.date} • {session.startTime} -{" "}
                              {session.endTime}
                            </p>
                            <p className="text-sm text-gray-500 capitalize">
                              {session.type} Session • ${session.price}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={`/dashboard/${
                                profile.user.role === "mentor"
                                  ? "mentor"
                                  : "mentee"
                              }/sessions/${session.id}`}
                            >
                              View Details
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        You dont have any sessions yet.
                      </p>
                      {profile.user.role === "user" && (
                        <Button asChild>
                          <Link href="/mentors">Find a Mentor</Link>
                          {/* <a href="/mentors">Find a Mentor</a> */}
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>
                    All your payments for mentoring sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {profile.payments.length > 0 ? (
                    <div className="space-y-4">
                      {profile.payments.map((payment) => (
                        <div
                          key={payment.id}
                          className="flex justify-between items-center p-4 border rounded-lg"
                        >
                          <div>
                            <h3 className="font-medium">
                              Payment for session with {payment.mentorName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {payment.date}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">
                                {payment.paymentMethod}
                              </Badge>
                              <Badge
                                className={
                                  payment.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : payment.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {payment.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${payment.amount}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                            >
                              Receipt
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        You dont have any payments yet.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Earnings Tab (Mentor Only) */}
            {profile.user.role === "mentor" && (
              <TabsContent value="earnings">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings</CardTitle>
                    <CardDescription>
                      Your earnings from mentoring sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold">
                            ${profile.earnings.total}
                          </div>
                          <p className="text-sm text-gray-500">
                            Total Earnings
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold">
                            ${profile.earnings.thisMonth}
                          </div>
                          <p className="text-sm text-gray-500">This Month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold">
                            ${profile.earnings.pending}
                          </div>
                          <p className="text-sm text-gray-500">Pending</p>
                        </CardContent>
                      </Card>
                    </div>

                    {profile.earnings.history.length > 0 ? (
                      <div className="space-y-4">
                        {profile.earnings.history.map((earning) => (
                          <div
                            key={earning.id}
                            className="flex justify-between items-center p-4 border rounded-lg"
                          >
                            <div>
                              <h3 className="font-medium">
                                Session with {earning.menteeName}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {earning.date}
                              </p>
                              <p className="text-sm text-gray-500 capitalize">
                                {earning.type} Session
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${earning.amount}</p>
                              <Badge
                                className={
                                  earning.status === "paid"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {earning.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">
                          You dont have any earnings yet.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

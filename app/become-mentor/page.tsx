import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, DollarSign, Users, Calendar } from "lucide-react"

export default function BecomeMentor() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Become a Mentor</h1>
        <p className="text-xl text-gray-600">
          Share your expertise, help others grow, and earn money on your own schedule
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center">
          <CardHeader>
            <DollarSign className="h-12 w-12 mx-auto text-primary" />
            <CardTitle>Set Your Own Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You decide how much your time and expertise are worth. Set different rates for chat, video, and call
              sessions.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Users className="h-12 w-12 mx-auto text-primary" />
            <CardTitle>Build Your Network</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Connect with mentees from around the world and build your professional network while helping others.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Calendar className="h-12 w-12 mx-auto text-primary" />
            <CardTitle>Flexible Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Set your own availability and work when it's convenient for you. No minimum time commitment required.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <ul className="space-y-6">
            <li className="flex">
              <CheckCircle className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Apply to be a mentor</h3>
                <p className="text-gray-600">
                  Fill out the application form with your professional background, areas of expertise, and why you want
                  to be a mentor.
                </p>
              </div>
            </li>
            <li className="flex">
              <CheckCircle className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Complete your profile</h3>
                <p className="text-gray-600">
                  Once approved, set up your profile with your bio, experience, education, and set your rates for
                  different session types.
                </p>
              </div>
            </li>
            <li className="flex">
              <CheckCircle className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Set your availability</h3>
                <p className="text-gray-600">
                  Use our calendar tool to mark when you're available for sessions. Update this anytime as your schedule
                  changes.
                </p>
              </div>
            </li>
            <li className="flex">
              <CheckCircle className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Start mentoring and earning</h3>
                <p className="text-gray-600">
                  Accept booking requests, conduct sessions, and receive payments directly to your account. We handle
                  all the payment processing.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Mentor Application</CardTitle>
              <CardDescription>Tell us about yourself and your expertise</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profession">Current Profession</Label>
                  <Input id="profession" placeholder="Senior Software Engineer" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expertise">Areas of Expertise</Label>
                  <Input id="expertise" placeholder="React, Node.js, System Design" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input id="experience" type="number" placeholder="5" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Tell us about yourself and why you want to be a mentor</Label>
                  <Textarea
                    id="bio"
                    placeholder="Share your background, experience, and motivation for mentoring..."
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to make an impact?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join our community of mentors today and start sharing your knowledge while earning on your own terms.
        </p>
        <Button size="lg">Apply Now</Button>
      </div>
    </div>
  )
}


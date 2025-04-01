import Link from "next/link"
import { MentorCard } from "@/components/mentor-card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { getMentors } from "@/lib/mentors"

export default async function Home() {
  // Sample mentor data - in a real app, this would come from a database
  const { mentors } = await getMentors({
    page:1,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Mentor</h1>
            <p className="text-xl mb-8">
              Connect with industry experts who can help you grow your skills and advance your career
            </p>
            <div className="relative max-w-xl mx-auto">
              <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg">
                <input
                  type="text"
                  placeholder="Search by skill, industry, or name..."
                  className="w-full py-4 px-6 text-gray-700 focus:outline-none"
                />
                <Button className="m-1" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Featured Mentors</h2>
          <Link href="/api/mentors">
            <Button variant="outline">View All Mentors</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Find a Mentor</h3>
              <p className="text-gray-600">
                Browse our curated list of expert mentors and find the perfect match for your needs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Book a Session</h3>
              <p className="text-gray-600">
                Choose your preferred communication method: chat, video call, or phone call.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Grow Your Skills</h3>
              <p className="text-gray-600">
                Connect with your mentor and start your journey toward personal and professional growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Become a Mentor</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Share your expertise, help others grow, and earn money on your own schedule.
          </p>
          <Link href="/become-mentor">
            <Button variant="secondary" size="lg">
              Apply Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}


import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMentors } from "@/lib/mentors";
import { MentorCard } from "@/components/mentor-card";

export default async function FeaturedMentors() {
  const { mentors } = await getMentors({
    page: 1,
  });
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Featured Mentors</h2>
        <Link href="/mentors">
          <Button variant="outline">View All Mentors</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </section>
  );
}

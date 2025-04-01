import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect Mentor
          </h1>
          <p className="text-xl mb-8">
            Connect with industry experts who can help you grow your skills and
            advance your career
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
  );
}

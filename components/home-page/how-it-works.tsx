export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-primary text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Find a Mentor</h3>
            <p className="text-gray-600">
              Browse our curated list of expert mentors and find the perfect
              match for your needs.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-primary text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Book a Session</h3>
            <p className="text-gray-600">
              Choose your preferred communication method: chat, video call, or
              phone call.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-primary text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Grow Your Skills</h3>
            <p className="text-gray-600">
              Connect with your mentor and start your journey toward personal
              and professional growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

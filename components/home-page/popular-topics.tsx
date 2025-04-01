import React from "react";
import { Search } from "lucide-react";

const PopularTopics = () => {
  return (
    <section className="py-8 px-4 bg-amber-100">
      <h2 className="text-2xl font-semibold text-blue-500 text-center mb-8">
        Popular Topics
      </h2>

      <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
        {[
          "Debug, fix code bugs in java",
          "How to balance work and study?",
          "Investments and saving money plans",
          "Want to improve my coding skills",
          "How do I build my personality",
          "Cybersecurity Threats",
          "Help with building brand",
        ].map((topic, index) => (
          <div
            key={index}
            className="bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-md"
          >
            <span className="text-sm">{topic}</span>
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-3 w-3" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularTopics;

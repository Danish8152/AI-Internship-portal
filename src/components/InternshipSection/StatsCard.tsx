import React from "react";
import StarField from "./StarField";

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "750", label: "Internship seats" },
  { value: "50+", label: "Mentors" },
  { value: "6 Weeks", label: "Duration" },
];

const StatsCard: React.FC = () => {
  return (
    <section className="relative overflow-hidden w-full py-10 sm:py-16 px-4 bg-black">
      <StarField />
      <div
        className="relative z-10 max-w-6xl mx-auto rounded-xl border border-white/10 bg-gradient-to-br from-[#0c1a2e] to-[#26140a] p-6 sm:p-8"
      >
        <h2 className="text-3xl sm:text-4xl font-bold font-serif  text-white text-center mb-10">
          Program Highlights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-[#12141c] p-6 text-center hover:scale-105 transition duration-300"
            >
              <p className="text-4xl sm:text-5xl font-extrabold   font-serif  bg-gradient-to-r from-[#1E90FF] to-[#FF6B35] text-transparent bg-clip-text">
                {stat.value}
              </p>
              <p className="mt-2 text-sm sm:text-base text-gray-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCard;
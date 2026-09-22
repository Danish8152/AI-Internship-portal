import React from "react";
import StarField from "./StarField";

const Overview: React.FC = () => {
  return (
    <section className="relative overflow-hidden  w-full py-10 px-4 bg-black">
      <StarField />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* LEFT: TEXT */}
        <div className="relative flex flex-col justify-center rounded-xl p-5 sm:p-7 lg:p-10 border-l-4 border-[#ff6b35] shadow-2xl bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight font-serif">
            Internship Overview
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
            The {""}
            <span className="text-orange-400 font-semibold">
              Bharat Space Education Research Centre
            </span>
            {""} is pleased to announce the {""}
            <span className="text-cyan-400 font-semibold">
              Def-Space Autumn Internship 2026
            </span>
            {""}, a flagship {""}
            <span className="text-orange-400 font-semibold">
              6-week intensive online
            </span>
            {""} initiative under the Def-Space Education and Innovation
            programme. across the nation.
          </p>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            This programme is open to undergraduate and postgraduate students
            from universities and colleges, both Government and Private, across
            all recognised institutions.
          </p>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
            This structured autumn internship delivers{" "}
            <span className="text-cyan-400 font-semibold">
              high-quality, hands-on education
            </span>{" "}
            in Space Science, Defence Technology, and Emerging Technologies to
            all candidates. It cultivates innovation, technical proficiency, and
            career awareness among young learners, advancing India's Viksit
            Bharat @2047 vision and the Atmanirbhar Bharat commitment to
            technological self-reliance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Overview;

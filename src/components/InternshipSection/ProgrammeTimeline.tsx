import React from "react";
import StarField from "./StarField";

interface TimelineCardProps {
  title: string;
  description: string;
  highlight: string;
  highlightColor: string;
  list?: string[];
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  title,
  description,
  highlight,
  highlightColor,
  list,
}) => {
  const colorClasses: Record<string, string> = {
    cyan: "text-cyan-400",
    amber: "text-amber-400",
    purple: "text-orange-400",
  };

  return (
    <div className="relative rounded-xl border border-white/10 bg-[#141C2E] p-6 sm:p-8 hover:border-white/20 transition duration-300">
      <h3 className="text-xl font-bold text-gray-100 font-serif mb-3">
        {title}
      </h3>
      <p className="text-gray-300 text-sm sm:text-base mb-2">{description}</p>
      <p
        className={`text-sm sm:text-base font-semibold ${colorClasses[highlightColor]}`}
      >
        {highlight}
      </p>
      {list && (
        <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
          {list.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
              <span className={`mt-1.5 h-1 w-1 flex-shrink-0 rounded-full ${colorClasses[highlightColor].replace("text-", "bg-")}`} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ProgrammeTimeline: React.FC = () => {
  return (
    <section className="relative overflow-hidden w-full py-10 sm:py-16 px-4 bg-black">
      <StarField />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif text-center mb-10">
          Programme Timeline
        </h2>

        {/* Duration — promoted to its own full-width banner rather than
            competing as a fifth grid cell, which would leave an awkward gap
            in a 3-column layout (or force a lopsided 3+2 split). */}
        <div className="mb-6 flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#141C2E] p-6 text-center sm:flex-row sm:gap-4 sm:p-7">
          <span className="text-lg font-bold text-gray-100 font-serif">Duration: 6 weeks</span>
          <span className="hidden h-5 w-px bg-white/15 sm:block" aria-hidden="true" />
          <span className="text-base font-semibold text-cyan-400">5th October - 15th November 2026</span>
        </div>

        {/* Week-by-week cards — 2x2 grid. `items-start` keeps each card at
            its own natural height instead of stretching the shorter ones to
            match "Weeks 1-3" (which is taller because of its session list). */}
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          <TimelineCard
            title="Weeks 1-3: Core Technologies"
            description="4 technologies, 3-day intensive session each"
            highlight="Weeks 1-3"
            highlightColor="purple"
            list={[
              "3-day AI sessions",
              "3-day advanced drone sessions",
              "3-day helicopter sessions",
              "3-day aircraft design technology sessions",
            ]}
          />
          <TimelineCard
            title="Week 4: Mentor Interaction"
            description="Guided mentor sessions"
            highlight="One-on-one and group mentor guidance"
            highlightColor="amber"
          />
          <TimelineCard
            title="Week 5: Project Work"
            description="Applied project work"
            highlight="Building on the 4 core technologies"
            highlightColor="cyan"
          />
          <TimelineCard
            title="Week 6: Submission & Evaluation"
            description="Project submission and evaluation"
            highlight="Final assessment week"
            highlightColor="amber"
          />
        </div>
      </div>
    </section>
  );
};

export default ProgrammeTimeline;

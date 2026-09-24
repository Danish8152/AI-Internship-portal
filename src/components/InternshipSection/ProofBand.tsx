import React from "react";
import { GraduationCap, Award, CalendarClock, ClipboardCheck } from "lucide-react";
import { INTERNSHIP } from "@/data/internship";

const items: Array<{ icon: React.ElementType; text: string }> = [
  { icon: GraduationCap, text: "Close to 100,000 students taught" },
  { icon: Award, text: "Certificate of completion" },
  { icon: CalendarClock, text: INTERNSHIP.sessionsLine },
  { icon: ClipboardCheck, text: "Assignments between sessions" },
];

const ProofBand: React.FC = () => {
  return (
    <div className="relative w-full bg-black border-y border-white/10 py-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 justify-items-center lg:justify-items-start">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.text}
              className="flex items-center gap-3 text-sm sm:text-[15px] font-semibold text-gray-200"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-cyan-400/20 text-orange-400">
                <Icon className="h-4 w-4" />
              </span>
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProofBand;

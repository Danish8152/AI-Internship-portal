import React from "react";
import { GraduationCap, BookOpen, Briefcase, Palette } from "lucide-react";
import Reveal from "./Reveal";
import Highlight from "./Highlight";

interface Persona {
  icon: React.ElementType;
  who: string;
  says: string;
}

const personas: Persona[] = [
  { icon: GraduationCap, who: "Student", says: "Everyone's using AI. I'm just copy-pasting." },
  { icon: BookOpen, who: "Researcher / PhD Scholar", says: "I don't fully trust AI with my sources." },
  { icon: Briefcase, who: "Working Professional", says: "My team keeps talking about AI agents. I nod along." },
  { icon: Palette, who: "Creator", says: "Editing and content creation eat up my whole week." },
];

const AudienceFit: React.FC = () => {
  return (
    <section id="who" className="relative w-full py-14 sm:py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif mb-4">
            Which one are <Highlight>you?</Highlight>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            The BSERC Gen AI &amp; AI Agents Internship is a live, hands-on
            programme open to students, researchers, working professionals
            and creators — anyone ready to move past copy-pasting prompts
            and actually put AI to work.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {personas.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.who} delay={i * 80}>
                <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-[#141C2E] p-5 sm:p-6 hover:border-white/20 transition duration-300">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-100 mb-1">{p.who}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      &ldquo;{p.says}&rdquo;
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center text-base sm:text-lg font-semibold text-orange-400">
          Nodded at even one? This internship was built for you.
        </p>
      </div>
    </section>
  );
};

export default AudienceFit;

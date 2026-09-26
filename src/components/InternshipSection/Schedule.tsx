import React from "react";
import Reveal from "./Reveal";
import Highlight from "./Highlight";
import { INTERNSHIP } from "@/data/internship";

const sessions = [
  { n: 1, title: "Understand the system" },
  { n: 2, title: "Ground your work in sources" },
  { n: 3, title: "Build, test and share" },
  { n: 4, title: "Work with agents across tools" },
  { n: 5, title: "Create and communicate" },
  { n: 6, title: "Reusable and reliable" },
];

const days = ["Friday", "Saturday", "Sunday"];
const weekends = [
  { label: "Weekend 1", sessions: sessions.slice(0, 3) },
  { label: "Weekend 2", sessions: sessions.slice(3) },
];

const HoursPill: React.FC = () => (
  <span className="my-2 inline-block rounded-full border border-orange-300/60 bg-orange-500 px-3 py-0.5 text-xs font-extrabold leading-relaxed text-black">
    {INTERNSHIP.hoursEach} hours
  </span>
);

const Schedule: React.FC = () => {
  return (
    <section className="relative w-full py-14 sm:py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif leading-tight mb-4">
            Understand the system. Then <Highlight>put it to work.</Highlight>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            The concepts explain what you see in the demonstrations. The
            assignments help you apply them.
          </p>
        </Reveal>

        {/* Timetable — desktop */}
        <Reveal delay={100}>
          <div className="mt-10 hidden overflow-hidden rounded-2xl border-2 border-white/20 bg-black md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Live session timetable: six sessions of two hours each across two weekends
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[150px] border-b border-r border-white/10 bg-white/5 p-5">
                    <span className="sr-only">Weekend</span>
                  </th>
                  {days.map((d, i) => (
                    <th
                      key={d}
                      scope="col"
                      className={`border-b border-white/10 bg-white/5 p-5 text-base font-bold text-gray-200 ${
                        i < days.length - 1 ? "border-r" : ""
                      }`}
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weekends.map((w, wi) => (
                  <tr key={w.label}>
                    <th
                      scope="row"
                      className={`whitespace-nowrap border-r border-white/10 bg-white/5 p-5 text-base font-bold text-gray-200 ${
                        wi < weekends.length - 1 ? "border-b" : ""
                      }`}
                    >
                      {w.label}
                    </th>
                    {w.sessions.map((s, si) => (
                      <td
                        key={s.n}
                        className={`border-white/10 p-5 align-top ${
                          si < w.sessions.length - 1 ? "border-r" : ""
                        } ${wi < weekends.length - 1 ? "border-b" : ""}`}
                      >
                        <b className="block text-xl font-bold leading-snug text-white">
                          Session {s.n}
                        </b>
                        <HoursPill />
                        <span className="block text-base text-gray-400">
                          {s.title}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Timetable — mobile */}
          <div className="mt-10 space-y-5 md:hidden">
            {weekends.map((w) => (
              <div
                key={w.label}
                className="overflow-hidden rounded-2xl border-2 border-white/20"
              >
                <p className="bg-white/5 px-5 py-3 text-base font-bold text-gray-200">
                  {w.label}
                </p>
                <ul>
                  {w.sessions.map((s, si) => (
                    <li key={s.n} className="border-t border-white/10 p-5">
                      <span className="mb-0.5 block text-sm font-extrabold text-cyan-400">
                        {days[si]}
                      </span>
                      <b className="block text-xl font-bold text-white">
                        Session {s.n}
                      </b>
                      <HoursPill />
                      <span className="block text-gray-400">{s.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <p className="mt-5 max-w-2xl text-sm sm:text-base font-bold text-gray-200">
          Six live sessions of two hours each: 12 live hours in total. Exact
          dates will be announced.
        </p>
        <p className="mt-6 text-sm sm:text-base font-semibold text-gray-400">
          Checking and safety start early and come back in the last session,
          so they are never an afterthought.
        </p>
      </div>
    </section>
  );
};

export default Schedule;

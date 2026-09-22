import React from "react";
import StarField from "./StarField";

interface DateItemProps {
  label: string;
  date: string;
}

const DateBox: React.FC<DateItemProps> = ({ label, date }) => (
  <div className="rounded-lg border border-white/10 bg-black/40 p-4">
    <p className="text-sm font-medium text-cyan-400 mb-1">{label}</p>
    <p className="text-lg font-semibold text-gray-100">{date}</p>
  </div>
);

const ProgramDetails: React.FC = () => {
  return (
    <section className="relative overflow-hidden w-full py-10 sm:py-16 px-4 bg-black">
      <StarField />
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT: Eligibility Criteria */}
        <div className="relative rounded-xl border border-white/10 bg-[#141C2E] p-6 sm:p-8 flex flex-col gap-5">
          <h3 className="text-2xl sm:text-3xl font-bold text-amber-400 font-serif">
            Eligibility Criteria
          </h3>

          <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p>
              <span className="font-semibold text-gray-100">Selection:</span> Merit-based through the Bharat Def-Space Autumn Internship Examination 2026
            </p>
            <p>
              <span className="font-semibold text-gray-100">Who Can Apply:</span> Students from Class VI to XII, B.Tech, M.Tech, PhD, and working professionals with interest in defence technology and space science
            </p>
          </div>

          <div className="mt-2 p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 font-semibold text-center sm:text-left">
            Total Merit Seats: 750
          </div>
        </div>

        {/* RIGHT: Important Dates */}
        <div className="relative rounded-xl border border-white/10 bg-[#141C2E] p-6 sm:p-8 flex flex-col gap-5">
          <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400 font-serif">
            Important Dates
          </h3>

          <div className="space-y-4">
            <DateBox label="Registration Start" date="7th September 2026" />
            <DateBox label="Registration End Date" date="30th September 2026" />
            <DateBox label="Offer Letter" date="03rd October 2026" />
            <DateBox label="Internship Period" date="5th October 2026 - 15th November 2026" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProgramDetails;
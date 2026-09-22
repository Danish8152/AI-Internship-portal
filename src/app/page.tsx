import Hero from "@/components/InternshipSection/Hero";
import StatsCard from "@/components/InternshipSection/StatsCard";
import Overview from "@/components/InternshipSection/Overview";
import BharatInternship from "@/components/InternshipSection/BharatInternship";
import ProgramDetails from "@/components/InternshipSection/ProgramDetails";
import ProgrammeTimeline from "@/components/InternshipSection/ProgrammeTimeline";
import PricingFees from "@/components/InternshipSection/PricingFees";
import { CoreTech } from "@/components/global/CoreTech";
import InternshipHighlights from "@/components/InternshipSection/InternshipHighlights";

const page = () => {
  return (
    <div className="bg-black">
      <Hero />
      <StatsCard />
      <BharatInternship />
      <Overview />
      <ProgramDetails />
      <ProgrammeTimeline />
      <PricingFees />
      <CoreTech />
      <InternshipHighlights />
    </div>
  );
};

export default page;

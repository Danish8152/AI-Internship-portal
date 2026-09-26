import Hero from "@/components/InternshipSection/Hero";
import StatsCard from "@/components/InternshipSection/StatsCard";
import BharatInternship from "@/components/InternshipSection/BharatInternship";
import Overview from "@/components/InternshipSection/Overview";
import ProofBand from "@/components/InternshipSection/ProofBand";
import NotTooLate from "@/components/InternshipSection/NotTooLate";
import WhyUnderstanding from "@/components/InternshipSection/WhyUnderstanding";
import ProjectGallery from "@/components/InternshipSection/ProjectGallery";
import { CoreTech } from "@/components/global/CoreTech";
import CurriculumJourney from "@/components/InternshipSection/CurriculumJourney";
import Schedule from "@/components/InternshipSection/Schedule";
import HowItWorks from "@/components/InternshipSection/HowItWorks";
import PricingFees from "@/components/InternshipSection/PricingFees";

const page = () => {
  return (
    <div className="bg-black">
      <Hero />
      <StatsCard />
      <BharatInternship />
      <Overview />
      <ProofBand />
      <NotTooLate />
      <WhyUnderstanding />
      <ProjectGallery />
      <PricingFees />
      <CoreTech />
      <CurriculumJourney />
      <Schedule />
      <HowItWorks />
    </div>
  );
};

export default page;

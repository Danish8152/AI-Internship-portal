import Hero from "@/components/InternshipSection/Hero";
import ProofBand from "@/components/InternshipSection/ProofBand";
import NotTooLate from "@/components/InternshipSection/NotTooLate";
import WhyUnderstanding from "@/components/InternshipSection/WhyUnderstanding";
import ProjectGallery from "@/components/InternshipSection/ProjectGallery";
import { CoreTech } from "@/components/global/CoreTech";
import CurriculumJourney from "@/components/InternshipSection/CurriculumJourney";
import AudienceFit from "@/components/InternshipSection/AudienceFit";
import Schedule from "@/components/InternshipSection/Schedule";
import HowItWorks from "@/components/InternshipSection/HowItWorks";
import InternshipHighlights from "@/components/InternshipSection/InternshipHighlights";
import FormatAndJoining from "@/components/InternshipSection/FormatAndJoining";
import FinalCTA from "@/components/InternshipSection/FinalCTA";

const page = () => {
  return (
    <div className="bg-black">
      <Hero />
      <ProofBand />
      <NotTooLate />
      <WhyUnderstanding />
      <ProjectGallery />
      <CoreTech />
      <CurriculumJourney />
      <AudienceFit />
      <Schedule />
      <HowItWorks />
      <InternshipHighlights />
      <FormatAndJoining />
      <FinalCTA />
    </div>
  );
};

export default page;

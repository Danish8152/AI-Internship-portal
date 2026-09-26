import Hero from "@/components/InternshipSection/Hero";
import ProofBand from "@/components/InternshipSection/ProofBand";
import NotTooLate from "@/components/InternshipSection/NotTooLate";
import WhyUnderstanding from "@/components/InternshipSection/WhyUnderstanding";
import ProjectGallery from "@/components/InternshipSection/ProjectGallery";
import { CoreTech } from "@/components/global/CoreTech";
import CurriculumJourney from "@/components/InternshipSection/CurriculumJourney";
import Schedule from "@/components/InternshipSection/Schedule";
import HowItWorks from "@/components/InternshipSection/HowItWorks";

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
      <Schedule />
      <HowItWorks />
    </div>
  );
};

export default page;

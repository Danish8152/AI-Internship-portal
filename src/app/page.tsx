import Hero from "@/components/InternshipSection/Hero";
import ProofBand from "@/components/InternshipSection/ProofBand";
import AudienceFit from "@/components/InternshipSection/AudienceFit";
import ProjectGallery from "@/components/InternshipSection/ProjectGallery";
import { CoreTech } from "@/components/global/CoreTech";
import CurriculumJourney from "@/components/InternshipSection/CurriculumJourney";
import FormatAndJoining from "@/components/InternshipSection/FormatAndJoining";
import InternshipHighlights from "@/components/InternshipSection/InternshipHighlights";

const page = () => {
  return (
    <div className="bg-black">
      <Hero />
      <ProofBand />
      <AudienceFit />
      <ProjectGallery />
      <CoreTech />
      <CurriculumJourney />
      <FormatAndJoining />
      <InternshipHighlights />
    </div>
  );
};

export default page;

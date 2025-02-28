import Header from "@/components/app-ui/home/Header";
import Competence from "@/components/app-ui/home/home-competence";
import SectionAbout from "@/components/app-ui/home/section-1";
import SectionReason from "@/components/app-ui/home/section-2";

export default function Home() {
  return (
    <div className="">
      <Header />
      <Competence />
      <SectionAbout />
      <SectionReason />
    </div>
  );
}

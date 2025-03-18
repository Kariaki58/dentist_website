import { FooterDesign } from "@/components/app-ui/footer-design";
import HomeContact from "@/components/app-ui/home/contact";
import Header from "@/components/app-ui/home/Header";
import Competence from "@/components/app-ui/home/home-competence";
import HomeGallery from "@/components/app-ui/home/home-gallery";
import HomeService from "@/components/app-ui/home/home-service";
import HomeStats from "@/components/app-ui/home/home-stats";
import SectionAbout from "@/components/app-ui/home/section-1";
import SectionReason from "@/components/app-ui/home/section-2";
import Reviews from "@/components/app-ui/Reviews";


export default function Home() {
  return (
    <div className="">
      <Header />
      <Competence />
      <SectionAbout />
      <SectionReason />
      <HomeStats />
      <HomeGallery />
      {/* <HomeService />
      <Reviews />
      <HomeContact /> */}
      <div className="h-screen"></div>
      <div className="">
        <FooterDesign />
      </div>
    </div>
  );
}

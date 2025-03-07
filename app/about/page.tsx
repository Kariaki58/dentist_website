import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import VideoComponent from "@/components/app-ui/about-us/video-component";
import SectionAbout from "@/components/app-ui/home/section-1";
import SectionReason from "@/components/app-ui/home/section-2";
import BookingComponent from "@/components/app-ui/booking-component";
import TeamSection from "@/components/app-ui/about-us/team-section";
import Faq from "@/components/app-ui/about-us/Faq";
import HomeContact from "@/components/app-ui/home/contact";
import Reviews from "@/components/app-ui/Reviews";
import { FooterDesign } from "@/components/app-ui/footer-design";


export default function About() {
    return (
        <>
            <header className="bg-[#FFF5E1] min-h-[60vh] w-full relative">
                <div className="flex justify-center pt-32">
                    <Button variant="outline" className="py-3 w-52 ml-6 text-orange-500 hover:text-orange-600 cursor-auto bg-transparent outline-orange-400 border-orange-400 hover:bg-transparent">About Us</Button>
                </div>
                <div className="flex justify-center items-center w-full max-w-xl mx-auto mt-6">
                    <div className="space-y-3">
                        <h2 className="text-5xl text-center font-bold">We Are <span className="text-orange-500 font-bold">Dentic</span></h2>
                        <p className="text-gray-600 text-center px-10">
                            Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. 
                            Duis leo. Sed fringilla mauris sit amet nibh.
                        </p>
                    </div>
                </div>
                <div className="max-w-screen-lg mx-auto mt-10 px-10 h-full">
                    <Suspense fallback={<p>Loading video...</p>}>
                        <VideoComponent />
                    </Suspense>
                </div>
            </header>
            <SectionAbout />
            <SectionReason />
            <BookingComponent />
            <TeamSection />
            <Faq />
            <HomeContact />
            <FooterDesign />
        </>
    );
}
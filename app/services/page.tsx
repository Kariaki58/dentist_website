import ServiceHeader from "@/components/app-ui/services/service-header";
import HomeService from "@/components/app-ui/home/home-service";
import Reviews from "@/components/app-ui/Reviews";
import BookingComponent from "@/components/app-ui/booking-component";
import Faq from "@/components/app-ui/about-us/Faq";
import HomeContact from "@/components/app-ui/home/contact";
import { FooterDesign } from "@/components/app-ui/footer-design";


export default function Services() {
    return (
        <main>
            <ServiceHeader btnText="Our Services" content="Our" title="Dental Services" description="Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh." />
            <HomeService />
            <Reviews />
            <BookingComponent />
            <div className="mt-20">
                <Faq />
            </div>
            <HomeContact />
            <FooterDesign />
        </main>
    );
}
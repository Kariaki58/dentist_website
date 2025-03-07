import ServiceHeader from "@/components/app-ui/services/service-header";
import AppointmentForm from "@/components/app-ui/appointment-form";
import Faq from "@/components/app-ui/about-us/Faq";
import { FooterDesign } from "@/components/app-ui/footer-design";

export default function AppointMent() {
    return (
        <section className="">
            <ServiceHeader btnText="Book An AppointMent" content="Meet Your Needs" title="With Dentic"  description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel, dolor eligendi! Dolor deserunt animi aperiam perspiciatis nostrum ipsa, fugit veniam et est porro tempora alias quibusdam vel debitis quam nemo." />
            <div className="max-w-screen-lg mx-auto my-10">
                <AppointmentForm />
            </div>
            <Faq />
            <FooterDesign />
        </section>
    );
}
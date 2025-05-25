import ServiceHeader from "@/components/app-ui/services/service-header";
import AppointmentForm from "@/components/app-ui/appointment-form";
import Faq from "@/components/app-ui/about-us/Faq";
import { Suspense } from "react";

export default function AppointMent() {
    return (
        <section className="">
            <ServiceHeader btnText="Book An AppointMent" content="Meet Your Needs" title="With Dentic"  description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel, dolor eligendi! Dolor deserunt animi aperiam perspiciatis nostrum ipsa, fugit veniam et est porro tempora alias quibusdam vel debitis quam nemo." />
            <div className="max-w-screen-lg mx-auto my-10 px-5">
                <Suspense fallback={<div className="text-center">Loading...</div>}>
                    <AppointmentForm />
                </Suspense>
            </div>
            <Faq />
        </section>
    );
}
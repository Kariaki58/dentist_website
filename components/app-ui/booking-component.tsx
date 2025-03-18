import { Button } from "@/components/ui/button";
import AppointmentForm from "@/components/app-ui/appointment-form";
import { MapPin, MailOpen, PhoneCall } from "lucide-react";
import Image from "next/image";
import dentist_office from "@/public/about-image/appoint-image.jpg";

export default function BookingComponent() {
    return (
        <section className="max-w-screen-xl mx-auto px-5 py-10 flex flex-wrap lg:flex-nowrap gap-10 items-center">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-6">
                <Button variant="outline" className="py-3 text-orange-500 hover:text-orange-600 cursor-auto mb-2">
                    Book Now
                </Button>
                <h2 className="text-4xl md:text-5xl font-bold">
                    Book Now & Secure <span className="text-orange-500">Your Seat</span> Here
                </h2>
                <p className="text-gray-600 md:pr-20">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-2">
                    <p className="hover:text-orange-500 flex gap-2 items-center">
                        <MapPin className="text-orange-500" />
                        Jl. Patimura II No. 18, Denpasar
                    </p>
                    <div className="flex flex-col md:flex-row gap-4">
                        <p className="hover:text-orange-500 flex gap-2 items-center">
                            <MailOpen className="text-orange-500" />
                            dentic@mail.com
                        </p>
                        <p className="hover:text-orange-500 flex gap-2 items-center">
                            <PhoneCall className="text-orange-500" />
                            +234 9121402541
                        </p>
                    </div>
                </div>

                {/* Image */}
                <div className="flex justify-center md:justify-start">
                    <Image
                        src={dentist_office}
                        alt="appointment"
                        width={400}
                        height={400}
                        className="rounded-lg object-cover w-full max-w-sm"
                    />
                </div>
            </div>

            {/* Right Content - Form */}
            <div className="w-full lg:w-1/2 flex justify-center">
                <AppointmentForm />
            </div>
        </section>
    );
}

import { Button } from "@/components/ui/button";
import AppointmentForm from "@/components/app-ui/appointment-form";
import { MapPin, MailOpen, PhoneCall } from "lucide-react";
import Image from "next/image";
import dentist_office from "@/public/about-image/appoint-image.jpg"


export default function BookingComponent() {
    return (
        <section className="flex max-w-screen-xl gap-5 mx-auto">
            <div className="space-y-5 w-1/2">
                <Button variant="outline" className="py-3 text-orange-500 hover:text-orange-600 cursor-auto mb-2">
                    Book Now
                </Button>
                <h2 className="text-5xl font-bold pr-20">
                    Book Now & Secure <span className="text-orange-500">Your Seat</span> Here
                </h2>
                <p className="text-gray-600 pr-56">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                </p>
                <p className="hover:text-orange-500 flex gap-2 items-center">
                    <MapPin className="text-orange-500"/>
                    Jl. Patimura II No. 18, Denpasar
                </p>
                <div className="flex gap-5">
                    <p className="hover:text-orange-500 flex gap-2 items-center">
                        <MailOpen className="text-orange-500"/>
                        dentic@mail.com
                    </p>
                    <p className="hover:text-orange-500 flex gap-2 items-center">
                        <PhoneCall className="text-orange-500"/>
                        +234 9121402541
                    </p>
                </div>
                <div className="flex justify-center">
                    <Image
                        src={dentist_office}
                        alt="appointment"
                        width={400}
                        height={400}
                        className="rounded-lg"
                    />
                </div>
            </div>
            <div>
                <AppointmentForm />
            </div>
        </section>
    )
}
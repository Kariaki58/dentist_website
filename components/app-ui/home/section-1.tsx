import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import doctor from "@/public/home-images/doctor.png";

export default function SectionAbout() {
    return (
        <section className="flex flex-col lg:flex-row items-center my-20 px-5 lg:px-20">
            <div className="w-full lg:w-1/2 animate-fade-in-left">
                <Image
                    src={doctor}
                    alt="Doctor"
                    width={500}
                    height={500}
                    className="w-full max-w-sm mx-auto lg:w-auto"
                />
            </div>
            <div className="w-full lg:w-1/2 space-y-6  lg:text-left mt-10 lg:mt-0 animate-fade-in-right">
                <Button variant="outline" className="text-orange-500 hover:text-orange-600 cursor-auto">
                    More About Us
                </Button>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    The Best <span className="text-orange-500">Dental Clinic</span> That You Can Trust
                </h2>
                <p className="text-gray-600">
                    Experience top-quality dental care with a team dedicated to your smile. 
                    We provide gentle, effective treatments in a comfortable and welcoming environment.
                </p>
                <p className="text-gray-600">
                    Get expert dental care from a team that puts your smile first. We offer gentle, 
                    high-quality treatments in a relaxing and friendly environment.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg font-bold">
                    <div className="flex items-center gap-2">
                        <BadgeCheck className="text-orange-500" /> Modern Equipment
                    </div>
                    <div className="flex items-center gap-2">
                        <BadgeCheck className="text-orange-500" /> Easy Online Appointment
                    </div>
                    <div className="flex items-center gap-2">
                        <BadgeCheck className="text-orange-500" /> Friendly Staff
                    </div>
                    <div className="flex items-center gap-2">
                        <BadgeCheck className="text-orange-500" /> Comfortable Clinic
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-5 mt-6">
                    <Button variant="default" className="p-8 bg-orange-500 hover:text-white hover:bg-orange-700">
                        Learn More
                    </Button>
                    <Button variant="outline" className="p-8 text-orange-500 hover:bg-orange-500 hover:text-white">
                        Book an Appointment
                    </Button>
                </div>
            </div>
        </section>
    );
}

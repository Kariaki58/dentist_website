import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import doctor from "@/public/doctor.png";


export default function SectionAbout() {
    return (
        <section className="flex items-center my-20">
            <Image
                src={doctor}
                alt="Doctor"
                width={500}
                height={500}
                className="w-1/2"
            />
            <div className="w-1/2 space-y-5 px-10">
                <div className="">
                    <Button variant="outline" className="text-orange-500 hover:text-orange-600 cursor-auto">More About Us</Button>
                </div>
                <h2 className="text-5xl font-bold">
                    The Best <span className="text-orange-500">Dental Clinic</span> That You Can Trust
                </h2>
                <p className="pr-20">
                    Experience top-quality dental care with a team dedicated to your smile. 
                    We provide gentle, effective treatments in a comfortable and welcoming environment.
                </p>
                <p className="pr-24">
                    Get expert dental care from a team that puts your smile first. We offer gentle, 
                    high-quality treatments in a relaxing and friendly environment.
                </p>
                <ul className="flex gap-10 my-20">
                    <ul className="space-y-5 font-bold text-lg">
                        <li className="flex items-center gap-2"><BadgeCheck className="text-orange-500"/> Modern Equipment</li>
                        <li className="flex items-center gap-2"><BadgeCheck className="text-orange-500"/> Easy Online Appointment</li>
                    </ul>
                    <ul className="space-y-5 font-bold text-lg">
                        <li className="flex items-center gap-2"><BadgeCheck className="text-orange-500"/> Friendly Staff</li>
                        <li className="flex items-center gap-2"><BadgeCheck className="text-orange-500"/> Comfortable Clinic</li>
                    </ul>
                </ul>
                <div className="flex gap-5">
                    <Button variant="default" className="p-8 bg-orange-500 hover:text-white hover:bg-orange-700">Learn More</Button>
                    <Button variant="outline" className="p-8 text-orange-500 hover:text-white-500 hover:bg-orange-500 hover:text-white">Book an Appointment</Button>
                </div>
            </div>
        </section>
    )
}
import doctor from "@/public/home-images/doctor.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function HomeContact() {
    return  (
        <section className="bg-orange-50 max-w-screen-xl mx-auto py-20 px-10 flex items-center relative mt-40 mb-20 rounded-sm h-[30rem]">
            <div className="w-1/2">
                <Button variant="outline" className="py-3 text-orange-500 hover:text-orange-600 rounded-none cursor-auto text-xl bg-transparent border-orange-200">
                    Contact Us
                </Button>
                <h2 className="text-5xl font-bold mt-5">
                    Become The Next Our <span className="text-orange-500">Happy Client</span>
                </h2>
                <p className="text-gray-600 pr-20 mt-5">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                    Aenean commodo ligula eget dolor. Aenean massa.
                </p>
                <div className="mt-16">
                    <Link href="/appointment" className="bg-orange-500 text-white p-4 rounded-md">Make an Appointment</Link>
                </div>

            </div>
            <Image
                src={doctor}
                alt="doctor"
                width={538}
                height={400}
                className="absolute -top-32 right-10"
            />
        </section>
    )
}
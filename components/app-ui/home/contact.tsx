import doctor from "@/public/home-images/doctor.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomeContact() {
    return (
        <section className="bg-orange-50 max-w-7xl mx-auto py-5 px-6 md:px-12 lg:px-16 rounded-xl mt-20 mb-10 flex flex-col-reverse lg:flex-row items-center relative overflow-hidden">
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
                <Button variant="outline" className="py-2 px-6 text-orange-600 border-orange-500 hover:bg-orange-500 hover:text-white transition">
                    Contact Us
                </Button>
                <h2 className="text-4xl md:text-5xl font-bold mt-4">
                    Become Our <span className="text-orange-500">Happy Client</span>
                </h2>
                <p className="text-gray-600 mt-4 leading-relaxed max-w-lg mx-auto lg:mx-0">
                    Join thousands of satisfied clients receiving top-tier dental care from our expert professionals.
                </p>
                <div className="mt-8">
                    <Link href="/appointment">
                        <Button className="bg-orange-500 text-white p-8 rounded-lg shadow-md hover:bg-orange-700 transition">
                            Make an Appointment
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Right Image */}
            <div className="lg:w-1/2 mb-10 flex justify-center">
                <Image 
                    src={doctor} 
                    alt="Doctor" 
                    width={500} 
                    height={400} 
                    className="object-contain"
                />
            </div>
        </section>
    );
}

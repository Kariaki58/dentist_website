import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctor from "@/public/home-images/doctor.png";

export default function TeamSection() {
    return (
        <section className="max-w-screen-lg mx-auto my-20 px-4">
            <div className="flex flex-col justify-center items-center space-y-4 text-center">
                <Button variant="outline" className="py-3 text-orange-500 hover:text-orange-600 cursor-auto mb-2">
                    Our Team
                </Button>
                <h2 className="text-3xl md:text-5xl font-bold">
                    Our Expert <span className="text-orange-500">Dentist</span>
                </h2>
                <p className="max-w-xl text-gray-500 text-sm md:text-base">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
                    Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                </p>
            </div>
            <div className="bg-orange-200 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-8 rounded-lg relative p-5">
                <div className="flex flex-col justify-center items-center">
                    <Image
                        src={doctor}
                        alt="Team Member 1"
                        width={250}
                        height={250}
                        className="rounded-full object-cover"
                    />
                    <div className="text-center bg-white p-4 rounded-md absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 shadow-md w-4/5">
                        <h3 className="text-xl md:text-3xl font-bold">Dr. John Doe</h3>
                        <p className="text-gray-500 text-sm md:text-base">Dentist</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
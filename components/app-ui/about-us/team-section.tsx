import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctor from "@/public/home-images/doctor.png";



export default function TeamSection() {
    return (
        <section className="max-w-screen-lg mx-auto my-20">
            <div className="flex flex-col justify-center items-center space-y-4">
                <Button variant="outline" className="py-3 text-orange-500 hover:text-orange-600 cursor-auto mb-2">
                    Our Team
                </Button>
                <h2 className="text-5xl font-bold">
                    Our Expert <span className="text-orange-500">Dentist</span>
                </h2>
                <p className="max-w-xl text-center text-gray-500">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
                    Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                </p>
            </div>
            <div className="bg-orange-200 w-96 max-w-screen-lg mx-auto mt-5 rounded-lg relative">
                <div className="flex flex-col justify-center items-center space-x-4">
                    <Image
                        src={doctor}
                        alt="Team Member 1"
                        width={300}
                        height={300}
                        className="rounded-full"
                    />
                    <div className="text-center bg-white p-4 rounded-md absolute bottom-0 opacity-75">
                        <h3 className="text-3xl font-bold">Dr. John Doe</h3>
                        <p className="text-gray-500">Dentist</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
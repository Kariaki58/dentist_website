import Image from "next/image";
import icon1 from "@/public/home-images/icon-1.svg";
import icon2 from "@/public/home-images/icon-2.svg";
import icon3 from "@/public/home-images/icon-3.svg";
import icon4 from "@/public/home-images/icon-4.svg";

export default function HomeStats() {
    return (
        <section className="bg-orange-100 py-10">
            <div className="flex justify-between items-center max-w-screen-xl mx-auto">
                <div className="flex items-center gap-3">
                    <Image src={icon1} alt="Icon 1" width={90} height={90} />
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">1,200 <span className="text-orange-500">+</span></h2>
                        <p className="text-lg text-gray-500 font-bold">Happy Client</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Image src={icon2} alt="Icon 2" width={90} height={90} />
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">5 <span>+</span></h2>
                        <p className="text-lg text-gray-500 font-bold">Years of Experience</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Image src={icon3} alt="Icon 3" width={90} height={90} />
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">340 <span>+</span></h2>
                        <p className="text-lg text-gray-500 font-bold">Online Appointment</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Image src={icon4} alt="Icon 4" width={90} height={90} />
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">100 <span>%</span></h2>
                        <p className="text-lg text-gray-500 font-bold">Satisfaction</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
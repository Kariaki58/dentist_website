import Image from "next/image";
import icon1 from "@/public/home-images/icon-1.svg";
import icon2 from "@/public/home-images/icon-2.svg";
import icon3 from "@/public/home-images/icon-3.svg";
import icon4 from "@/public/home-images/icon-4.svg";

export default function HomeStats() {
    return (
        <section className="bg-orange-100 py-10 mt-48 sm:mt-0">
            <div className="max-w-screen-xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {/* Stat 1 */}
                    <div className="flex flex-col items-center">
                        <Image src={icon1} alt="Happy Clients" width={70} height={70} className="w-16 h-16 md:w-20 md:h-20" />
                        <h2 className="text-2xl md:text-3xl font-bold mt-3">1,200<span className="text-orange-500">+</span></h2>
                        <p className="text-sm md:text-lg text-gray-600 font-medium">Happy Clients</p>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex flex-col items-center">
                        <Image src={icon2} alt="Experience" width={70} height={70} className="w-16 h-16 md:w-20 md:h-20" />
                        <h2 className="text-2xl md:text-3xl font-bold mt-3">5<span>+</span></h2>
                        <p className="text-sm md:text-lg text-gray-600 font-medium">Years of Experience</p>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex flex-col items-center">
                        <Image src={icon3} alt="Online Appointments" width={70} height={70} className="w-16 h-16 md:w-20 md:h-20" />
                        <h2 className="text-2xl md:text-3xl font-bold mt-3">340<span>+</span></h2>
                        <p className="text-sm md:text-lg text-gray-600 font-medium">Online Appointments</p>
                    </div>

                    {/* Stat 4 */}
                    <div className="flex flex-col items-center">
                        <Image src={icon4} alt="Satisfaction" width={70} height={70} className="w-16 h-16 md:w-20 md:h-20" />
                        <h2 className="text-2xl md:text-3xl font-bold mt-3">100<span>%</span></h2>
                        <p className="text-sm md:text-lg text-gray-600 font-medium">Satisfaction</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

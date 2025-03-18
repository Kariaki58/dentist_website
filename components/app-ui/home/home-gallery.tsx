import Image from "next/image";
import gallery1 from "@/public/home-images/gallery-1.webp";
import gallery2 from "@/public/home-images/gallery-2.webp";
import gallery3 from "@/public/home-images/gallery-3.jpg";
import gallery4 from "@/public/home-images/gallery-4.jpg";
import gallery5 from "@/public/home-images/gallery-5.webp";

export default function HomeGallery() {
    return (
        <section className="flex flex-col lg:flex-row items-center lg:items-stretch min-h-screen mb-20">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 px-4 md:px-10">
                {/* Row 1 */}
                <div className="flex flex-col md:flex-row items-center md:items-stretch gap-4">
                    <Image 
                        src={gallery1} 
                        alt="Gallery 1" 
                        width={300} 
                        height={300} 
                        className="rounded-lg w-full md:w-1/2 object-cover"
                    />
                    <div className="bg-orange-500 text-white p-6 flex flex-col justify-center items-center rounded-lg text-center">
                        <h3 className="text-xl md:text-2xl font-semibold">The Best Services</h3>
                        <p className="text-sm md:text-base mt-2">We provide top-notch services with expert professionals.</p>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col-reverse md:flex-row items-center md:items-stretch gap-4">
                    <div className="bg-orange-800 text-white p-6 flex flex-col justify-center items-center rounded-lg text-center">
                        <h3 className="text-xl md:text-2xl font-semibold">Expert Doctor</h3>
                        <p className="text-sm md:text-base mt-2">Our doctors are highly qualified and experienced.</p>
                    </div>
                    <Image 
                        src={gallery2} 
                        alt="Gallery 2" 
                        width={300} 
                        height={300} 
                        className="rounded-lg w-full md:w-1/2 object-cover"
                    />
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-2 gap-4">
                    <Image 
                        src={gallery3} 
                        alt="Gallery 3" 
                        width={420} 
                        height={320} 
                        className="rounded-lg w-full object-cover"
                    />
                    <Image 
                        src={gallery5} 
                        alt="Gallery 5" 
                        width={420} 
                        height={320} 
                        className="rounded-lg w-full object-cover"
                    />
                </div>
            </div>

            {/* Right Full-Height Image */}
            <div className="w-full lg:w-1/2 h-[400px] lg:h-auto relative mt-10 lg:mt-0">
                <Image 
                    src={gallery4}
                    alt="Gallery 4"
                    fill
                    className="object-cover rounded-lg"
                    quality={100}
                />
            </div>
        </section>
    );
}

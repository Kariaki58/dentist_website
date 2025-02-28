import Image from "next/image";
import gallery1 from "@/public/home-images/gallery-1.webp";
import gallery2 from "@/public/home-images/gallery-2.webp";
import gallery3 from "@/public/home-images/gallery-3.jpg";
import gallery4 from "@/public/home-images/gallery-4.jpg";
import gallery5 from "@/public/home-images/gallery-5.webp";

export default function HomeGallery() {
    return (
        <section className="flex flex-col lg:flex-row h-screen mb-20">
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="flex">
                    <Image src={gallery1} alt="Gallery 1" width={300} height={300} className="" />
                    <div className="bg-orange-500 text-white p-4 flex items-center justify-center flex-col space-y-3">
                        <h3 className="text-2xl font-semibold">The Best Services</h3>
                        <p className="text-sm text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et magna.</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="bg-orange-800 text-white p-4 flex items-center justify-center flex-col space-y-3">
                        <h3 className="text-2xl font-semibold">Expert Doctor</h3>
                        <p className="text-sm text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et magna.</p>
                    </div>
                    <Image src={gallery2} alt="Gallery 2" width={300} height={300} className="" />
                </div>
                <div className="grid grid-cols-2">
                    <div className="flex w-full">
                        <Image src={gallery3} alt="Gallery 3" width={420} height={320} className="" />
                    </div>
                    <div className="flex w-full">
                        <Image src={gallery5} alt="Gallery 3" width={420} height={320} className="" />
                    </div>
                </div>
                
            </div>
            <div className="w-full lg:w-1/2 h-screen relative">
                <Image 
                    src={gallery4}
                    alt="Gallery 4"
                    fill={true}
                    className="object-cover"
                    quality={100}
                />
            </div>
        </section>
    );
}

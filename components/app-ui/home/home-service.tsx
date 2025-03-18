import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import service1 from "@/public/service-images/service-1.jpg";
import service2 from "@/public/service-images/service-2.jpg";
import service3 from "@/public/service-images/service-3.jpg";
import service4 from "@/public/service-images/service-4.jpg";
import service5 from "@/public/service-images/service-5.webp";
import service6 from "@/public/service-images/service-6.jpg";

interface IService {
    id: number;
    image: string | StaticImageData;
    title: string;
    price: number;
    description: string;
}

export default function HomeService() {
    const services: IService[] = [
        { id: 1, image: service1, title: "Teeth Checkup", price: 10, description: "Regular dental checkups for a healthy smile." },
        { id: 2, image: service2, title: "Teeth Whitening", price: 20, description: "Brighten your smile with professional whitening." },
        { id: 3, image: service3, title: "Dental Braces", price: 30, description: "Get the perfect alignment with our braces treatment." },
        { id: 4, image: service4, title: "Teeth Implants", price: 40, description: "Restore your missing teeth with high-quality implants." },
        { id: 5, image: service5, title: "Dental Filling", price: 50, description: "Repair cavities with durable, natural-looking fillings." },
        { id: 6, image: service6, title: "Cosmetic Dentistry", price: 60, description: "Enhance your smile with our cosmetic dental services." }
    ];

    return (
        <section className="my-20 max-w-7xl mx-auto px-6">
            <div className="text-center">
                <Button variant="outline" className="py-2 px-6 text-orange-600 border-orange-500 hover:bg-orange-500 hover:text-white transition">
                    Our Services
                </Button>
                <h2 className="text-4xl font-bold mt-4">
                    <span className="text-orange-500">Best Quality</span> Services
                </h2>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    We provide world-class dental care with modern technology and experienced professionals.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {services.map(service => (
                    <div key={service.id} className="group relative bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="relative w-full h-64">
                            <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="p-6 space-y-3">
                            <h3 className="text-xl font-semibold">{service.title}</h3>
                            <p className="text-gray-500 text-sm">{service.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-bold text-orange-600">${service.price}</span>
                                <Button variant="default" className="py-2 px-4 bg-orange-500 hover:bg-orange-700 text-white transition">
                                    Book Now
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

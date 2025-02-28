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
        {
            id: 1,
            image: service1,
            title: "Teeth Checkup",
            price: 10,
            description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        },
        {
            id: 2,
            image: service2,
            title: "Teeth Whitening",
            price: 20,
            description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        },
        {
            id: 3,
            image: service3,
            title: "Dental Braces",
            price: 30,
            description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        },
        {
            id: 4,
            image: service4,
            title: "Teeth Implants",
            price: 40,
            description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        },
        {
            id: 5,
            image: service5,
            title: "Dental Filling",
            price: 50,
            description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        },
        {
            id: 6,
            image: service6,
            title: "Cosmetic",
            price: 60,
            description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        }
    ]
    return (
        <section className="my-20 space-y-4 max-w-screen-xl mx-auto">
            <div className="flex justify-center">
                <Button variant="outline" className="py-3 text-orange-500 hover:text-orange-600 cursor-auto">Our Services</Button>
            </div>
            <h2 className="text-4xl font-bold text-center mt-2"><span className="text-orange-500">Best Quality</span> Services</h2>
            <p className="text-center px-96 text-gray-600 mt-10">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                Aenean commodo ligula aenean massa.
            </p>
            <div className="grid grid-cols-3 gap-2">
                {services.map(service => (
                    <div key={service.id} className="h-96 relative">
                        <Image src={service.image} alt={service.title} fill={true} className="object-cover"/>
                        <div className="absolute bottom-0 w-[70%] bg-white p-3 space-y-2">
                            <h3 className="text-xl font-bold">{service.title}</h3>
                            <p className="text-sm text-gray-500">{service.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-orange-500">${service.price}</span>
                                <Button variant="default" className="py-2 px-4 bg-orange-500 hover:bg-orange-950 text-white">Book Now</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
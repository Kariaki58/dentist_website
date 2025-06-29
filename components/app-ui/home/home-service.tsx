import Service from "@/models/services";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import connectToDatabase from "@/lib/mongoose";
import { headers } from 'next/headers';
import Link from "next/link";


interface IService {
    _id: number;
    image: string | StaticImageData;
    name: string;
    price: number;
    description: string;
}

export default async function HomeService() {
    let err = null;
    let services: IService[] = [];
    let loading = false
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';


    try {
        loading = true;
        await connectToDatabase();
        if (pathname === "/services") {
            services = await Service.find().sort({ createdAt: -1 });
        } else {
            services = await Service.find().sort({ createdAt: -1 }).limit(6);
        }
        if (!services || services.length === 0) {
            err = "No services found";
        }
    } catch (error: any) {
        err = "Failed to fetch services";
    } finally {
        loading = false;
    }
    if (loading) {
        return (
            <section className="my-20 max-w-7xl mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-4xl font-bold">Loading...</h2>
                </div>
            </section>
        );
    }
    

    if (err) {
        return (
            <section className="my-20 max-w-7xl mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-red-600">Error</h2>
                    <p className="text-gray-600 mt-4">{err}</p>
                </div>
            </section>
        );
    }

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
                    <div key={service._id} className="group relative bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="relative w-full h-64">
                            <Image src={service.image} alt={service.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="p-6 space-y-3">
                            <h3 className="text-xl font-semibold">{service.name}</h3>
                            <p className="text-gray-500 text-sm">{service.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-bold text-orange-600">₦{service.price}</span>
                                <Link href={`/appointment?serviceName=${service.name.replace(' ', '-')}`}>
                                    <Button variant="default" className="py-2 px-4 bg-orange-500 hover:bg-orange-700 text-white transition">
                                        Book Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

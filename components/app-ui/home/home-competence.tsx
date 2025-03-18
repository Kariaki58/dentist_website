import { HandPlatter, Medal, Telescope } from "lucide-react";

const features = [
    {
        icon: HandPlatter,
        title: "Affordable Price",
        description: "We offer a wide range of dental services at affordable prices. Our team of experts will help you find the best solution for your needs."
    },
    {
        icon: Medal,
        title: "Professional Dentist",
        description: "Our team of professional dentists is dedicated to providing you with the best care possible. We are committed to helping you achieve and maintain a healthy smile."
    },
    {
        icon: Telescope,
        title: "Satisfactory Service",
        description: "Our dental services are designed to provide you with a satisfying and comfortable experience. We strive to make your dental visit as enjoyable as possible."
    }
];

export default function Competence() {
    return (
        <section className="py-16 px-4 max-w-screen-xl mx-auto mt-72 sm:mt-48 md:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 items-center">
                {features.map((feature, index) => (
                    <div 
                        key={index}
                        className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transition-transform duration-500 ease-in-out hover:scale-105"
                    >
                        <feature.icon size={72} className="text-orange-700 mb-4" />
                        <h2 className="font-bold text-xl mb-2">{feature.title}</h2>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

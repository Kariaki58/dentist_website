import { HandPlatter, Medal, Telescope } from "lucide-react";

export default function Competence() {
    return (
        <section className="flex justify-between gap-20 items-center my-20 max-w-screen-lg mx-auto">
            <div className="flex justify-center items-center flex-col">
                <HandPlatter size={82} className="text-orange-700"/>
                <h2 className="font-bold text-xl my-2">Affordable Price</h2>
                <p className="text-center text-gray-600">
                    We offer a wide range of dental services at affordable prices. 
                    Our team of experts will help you find the best solution for your needs.
                </p>
            </div>
            <div className="flex justify-center items-center flex-col">
                <Medal size={82} className="text-orange-700" />
                <h2 className="font-bold text-xl my-2">Professional Dentist</h2>
                <p className="text-center text-gray-600">
                    Our team of professional dentists is dedicated to providing you with the best care possible. 
                    We are committed to helping you achieve and maintain a healthy smile.
                </p>
            </div>
            <div className="flex justify-center items-center flex-col">
                <Telescope size={82} className="text-orange-700" />
                <h2 className="font-bold text-xl my-2">Satisfactory Service</h2>
                <p className="text-center text-gray-600">
                    Our dental services are designed to provide you with a satisfying and comfortable experience. 
                    We strive to make your dental visit as enjoyable as possible.
                </p>
            </div> 
        </section>
    )
}
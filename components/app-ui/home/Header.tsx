"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import header_picture from "@/public/full-card.svg";
import bigger_card from "@/public/home-images/bigger-card.png";
import { Button } from "@/components/ui/button";
import Form from "./Form";


export default function Header() {
    return (
        <header className="flex flex-col lg:flex-row items-center relative bg-[#FFF5E1] lg:bg-white">
            <div className="w-[80%] lg:w-1/2 h-full flex flex-col justify-center space-y-4 px-2 xl:px-14 bg-white">
                <div className="flex justify-center mt-10 lg:block lg:mt-0">
                    <Button variant="outline" className="py-3 w-52 ml-6 text-orange-500 hover:text-orange-600 cursor-auto">👋 Hey! we are Dentist</Button>
                </div>
                <h1 className="text-3xl md:text-5xl xl:text-7xl font-bold text-center lg:text-start">
                    Helping You to Bring Back Your <span className="text-orange-500">Happy Smile</span>
                </h1>
                <p className="py-5 text-center lg:text-start">
                    Your smile reflects your confidence and well-being. With expert care 
                    and personalized treatments, we help restore its beauty and health. 
                    Let us bring back the joy of smiling—because you deserve it!
                </p>
            </div>
            <div className="w-full lg:w-1/2 h-screen relative">
                <Image
                    src={header_picture}
                    alt="header picture"
                    fill={true}
                    className="object-cover"
                    quality={100}
                />
            </div>
            <motion.div
                className="absolute top-10 right-72 lg:right-96 h-24 w-40"
                animate={{ x: [0, -40, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <Image src={bigger_card} alt="bigger card" height={100} className="hidden lg:block" />
            </motion.div>
            <div className="absolute -bottom-72 sm:-bottom-52 md:bottom-0 left-0 xl:left-14 z-10 lg:bottom-2 px-2 lg:px-0 w-full md:w-auto">
                <Form />
            </div>
        </header>
    );
}

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import doctor from "@/public/home-images/doctor.png";
import FormChooseUs from "./form-choose-us";


export default function SectionReason() {
    const [dentalPercent, setDentalPercent] = useState<number>(0);
    const [cosmeticPercent, setCosmeticPercent] = useState<number>(0);
    const targetDental: number = 95;
    const targetCosmetic: number = 85;

    useEffect(() => {
        const interval = setInterval(() => {
            setDentalPercent((prev) => (prev < targetDental ? prev + 1 : targetDental));
            setCosmeticPercent((prev) => (prev < targetCosmetic ? prev + 1 : targetCosmetic));
        }, 20);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="flex max-w-screen-lg items-center px-14 relative my-20">
            <div className="w-1/2">
                <Button variant="outline" className="py-3 text-orange-500 hover:text-orange-600 cursor-auto mb-2">
                    Why Choose Us
                </Button>
                <h2 className="text-5xl font-bold pr-2 leading-snug">
                    Helping Your <span className="text-orange-500">Tooth Problems</span>
                </h2>
                <p className="mt-2 mb-10 text-gray-600">
                    We provide expert dental and cosmetic care to ensure your smile stays healthy and beautiful.
                    Our professional team is dedicated to your comfort and well-being.
                </p>
                <div className="mb-3 text-lg">
                    <h3 className="flex justify-between">
                        <span className="font-bold">Dental and Mouth Care</span>
                        <span className="text-gray-600">{dentalPercent}%</span>
                    </h3>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={dentalPercent}
                        readOnly
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:cursor-default"
                        style={{
                            background: `linear-gradient(to right, #f97316 ${dentalPercent}%, #e5e7eb ${dentalPercent}%)`,
                            WebkitAppearance: "none",
                            appearance: "none",
                        }}
                    />
                </div>
                <div className="text-lg">
                    <h3 className="flex justify-between">
                        <span className="font-bold">Cosmetic Treatment</span>
                        <span className="text-gray-600">{cosmeticPercent}%</span>
                    </h3>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={cosmeticPercent}
                        readOnly
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:cursor-default"
                        style={{
                            background: `linear-gradient(to right, #f97316 ${cosmeticPercent}%, #e5e7eb ${cosmeticPercent}%)`,
                            WebkitAppearance: "none",
                            appearance: "none",
                        }}
                    />
                </div>
            </div>
            <Image src={doctor} alt="Doctor" width={500} height={500} />
            <div className="absolute -right-60">
                <FormChooseUs />
            </div>
        </section>
    );
}

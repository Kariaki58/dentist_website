"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AlignJustify, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export default function Navigation() {
        const pathname: string = usePathname();
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const navItems = [
            { name: "Home", href: "/" },
            { name: "About Us", href: "/about" },
            { name: "Services", href: "/services" },
            { name: "Portfolio", href: "/portfolio" },
            { name: "Contact Us", href: "/contact" },
        ];
    return (
        <header className="py-4 border-y shadow-md bg-white fixed top-0 left-0 w-full z-50">
            <nav className="flex justify-between max-w-screen-xl mx-auto items-center px-5 lg:px-2">
                <Link className="" href="/">
                    <h1 className="text-3xl font-bold text-black">DENTIST</h1>
                </Link>
                <ul className="hidden md:flex justify-between gap-10">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className={pathname === item.href ? "text-orange-500 font-semibold" : "hover:text-orange-500 font-semibold text-black"}>
                            {item.name}
                        </Link>
                    ))}
                </ul>
                <Link href="/appointment" className="hidden md:block bg-orange-500 py-4 px-5 rounded-lg text-white hover:bg-orange-600 transition">Make an Appointment</Link>
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                    {isOpen ? <X size={28} /> : <AlignJustify size={28} />}
                </button>
            </nav>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-16 right-0 w-80 bg-white shadow-md md:hidden"
                    >
                        <ul className="flex flex-col items-center py-5 gap-5">
                            {navItems.map((item) => (
                                <Link key={item.href} href={item.href} className={pathname === item.href ? "text-orange-500 font-semibold" : "hover:text-orange-500 font-semibold text-gray-700"} onClick={() => setIsOpen(false)}>
                                    {item.name}
                                </Link>
                            ))}
                            <Link href="/appointment" className="bg-orange-500 py-3 px-5 rounded-lg text-white hover:bg-orange-600 transition" onClick={() => setIsOpen(false)}>
                                Make an Appointment
                            </Link>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
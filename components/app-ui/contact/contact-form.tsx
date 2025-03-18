import { MapPin, MailOpen, PhoneCall, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import GoogleMaps from "../Maps";

export default function ContactForm() {
    return (
        <section className="max-w-screen-xl mx-auto px-6 md:px-10 my-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <form className="w-full bg-white shadow-lg rounded-lg p-6 md:p-10 space-y-6 col-span-2 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Get in Touch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Your Name" required />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="tel" id="phone" name="phone" className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Your Phone" required />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Your Email" required />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                        <input type="text" id="subject" name="subject" className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Subject" required />
                    </div>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" name="message" rows={6} className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" className="bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition duration-300 w-full">Send Message</button>
            </form>
            
            <aside className="bg-orange-800 text-white rounded-lg p-6 md:p-10 flex flex-col justify-between space-y-5">
                <div>
                    <h2 className="font-bold text-3xl">Contact Us</h2>
                    <div className="mt-4 space-y-3">
                        <p className="flex gap-2 items-center text-lg">
                            <MapPin size={20} /> Jl. Patimura II No. 18, Denpasar
                        </p>
                        <p className="flex gap-2 items-center text-lg">
                            <MailOpen size={20} /> dentic@mail.com
                        </p>
                        <p className="flex gap-2 items-center text-lg">
                            <PhoneCall size={20} /> +234 9121402541
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 mt-6">
                    <Link href="https://facebook.com" className="hover:text-orange-500">
                        <Facebook size={24} />
                    </Link>
                    <Link href="https://twitter.com" className="hover:text-orange-500">
                        <Twitter size={24} />
                    </Link>
                    <Link href="https://instagram.com" className="hover:text-orange-500">
                        <Instagram size={24} />
                    </Link>
                    <Link href="https://youtube.com" className="hover:text-orange-500">
                        <Youtube size={24} />
                    </Link>
                </div>
                <GoogleMaps />
            </aside>
        </section>
    );
}


import { MapPin, MailOpen, PhoneCall, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import GoogleMaps from "../Maps";


export default function ContactForm() {
    return (
        <section className="grid grid-cols-3 max-w-screen-xl mx-auto px-10 my-20">
            <form className="w-full bg-white shadow-lg rounded-l-lg p-10 space-y-6 col-span-2">                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" className="mt-1 w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Your Name" required />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="tel" id="phone" name="phone" className="mt-1 w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Your Phone" required />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" className="mt-1 w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Your Email" required />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                        <input type="text" id="subject" name="subject" className="mt-1 w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Subject" required />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" name="message" rows={8} className="mt-1 w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" className="bg-orange-500 text-white font-semibold p-5 rounded-sm hover:bg-orange-700 transition duration-300">Send Message</button>
            </form>
            <aside className="bg-orange-800 rounded-r-lg p-10 space-y-5">
                <h2 className="font-bold text-3xl text-white">Contact Us</h2>
                
                <div className="text-white space-y-3">
                    <p className="hover:text-orange-500 flex gap-2 items-center text-base">
                        <MapPin className="hover:text-orange-500" size={20}/>
                        Jl. Patimura II No. 18, Denpasar
                    </p>
                    <p className="hover:text-orange-500 flex gap-2 items-center">
                        <MailOpen className="hover:text-orange-500" size={20}/>
                        dentic@mail.com
                    </p>
                    <p className="hover:text-orange-500 flex gap-2 items-center">
                        <PhoneCall className="hover:text-orange-500" size={20}/>
                        +234 9121402541
                    </p>
                </div>
                <div className="flex gap-2 items-center text-white">
                    <Link href="https://facebook.com">
                        <Facebook />
                    </Link>
                    <Link href="https://facebook.com">
                        <Twitter />
                    </Link>
                    
                    <Instagram />
                    <Youtube />
                </div>
                <GoogleMaps />
            </aside>
        </section>
    );
}
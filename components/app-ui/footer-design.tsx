import {
    Footer,
    FooterCopyright,
    FooterDivider,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
} from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import AdminButton from "../admin-button";
import PhoneSubscription from "./PhoneSubscription";

export function FooterDesign() {
    return (
        <Footer container className="bg-orange-950 rounded-none py-10 px-6">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Logo and Subscription */}
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-4">DENTIST</h1>
                        <PhoneSubscription />
                    </div>

                    {/* Navigation Links */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <FooterTitle title="Links" className="text-white" />
                            <FooterLinkGroup col>
                                <FooterLink href="/" className="text-white">Home</FooterLink>
                                <FooterLink href="/about" className="text-white">About Us</FooterLink>
                                <FooterLink href="/services" className="text-white">Services</FooterLink>
                                <FooterLink href="/contact" className="text-white">Contact</FooterLink>
                                <FooterLink href="/appointment" className="text-white">Appointment</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Legal" className="text-white" />
                            <FooterLinkGroup col>
                                <FooterLink href="/policy" className="text-white">Privacy Policy</FooterLink>
                                <FooterLink href="/conditions" className="text-white">Terms & Conditions</FooterLink>
                            </FooterLinkGroup>
                        </div>
                    </div>

                    {/* Socials and Admin */}
                    <div className="flex flex-col items-start justify-between space-y-4 md:items-end md:space-y-0">
                        <AdminButton />
                        <div className="flex space-x-4">
                            <FooterIcon href="#" icon={BsFacebook} className="text-white" />
                            <FooterIcon href="#" icon={BsInstagram} className="text-white" />
                            <FooterIcon href="#" icon={BsTwitter} className="text-white" />
                        </div>
                    </div>
                </div>

                <FooterDivider className="my-6 border-white" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-50">
                    We give the best you deserve
                </div>
            </div>
        </Footer>
    );
}

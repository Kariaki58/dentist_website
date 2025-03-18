
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


export function FooterDesign() {
return (
    <Footer container className="bg-orange-950 rounded-none">
        <div className="w-full">
            <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-white">
                    DENTIST
                </h1>
                <p className="text-white mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                <div>
                <FooterTitle title="links" className="text-white"/>
                <FooterLinkGroup col>
                    <FooterLink href="/" className="text-white">Home</FooterLink>
                    <FooterLink href="/about" className="text-white">About Us</FooterLink>
                    <FooterLink href="/services" className="text-white">Services</FooterLink>
                    <FooterLink href="/contact" className="text-white">Contact</FooterLink>
                    <FooterLink href="/appointment" className="text-white">Make an Appointment</FooterLink>
                </FooterLinkGroup>
                </div>
                <div>
                <FooterTitle title="Legal" className="text-white"/>
                <FooterLinkGroup col>
                    <FooterLink href="/policy" className="text-white">Privacy Policy</FooterLink>
                    <FooterLink href="/conditions" className="text-white">Terms &amp; Conditions</FooterLink>
                </FooterLinkGroup>
                </div>
            </div>
            </div>
            <FooterDivider className="text-white"/>
            <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright className="text-white" href="#" by="Flowbite™" year={2022} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                <FooterIcon href="#" icon={BsFacebook} className="text-white" />
                <FooterIcon href="#" icon={BsInstagram} className="text-white"/>
                <FooterIcon href="#" icon={BsTwitter} className="text-white"/>
            </div>
            </div>
        </div>
    </Footer>
);
}

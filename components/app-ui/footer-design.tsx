
import {
    Footer,
    FooterBrand,
    FooterCopyright,
    FooterDivider,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
} from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
// import { Facebook, Twitter, Instagram } from "lucide-react";


export function FooterDesign() {
return (
    <Footer container className="bg-orange-950 rounded-none">
        <div className="w-full">
            <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <h1 className="text-4xl font-bold text-white">
                DENTIST
            </h1>
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
            <FooterDivider />
            <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href="#" by="Flowbite™" year={2022} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                <FooterIcon href="#" icon={BsFacebook} />
                <FooterIcon href="#" icon={BsInstagram} />
                <FooterIcon href="#" icon={BsTwitter} />
                <FooterIcon href="#" icon={BsGithub} />
                <FooterIcon href="#" icon={BsDribbble} />
            </div>
            </div>
        </div>
    </Footer>
);
}

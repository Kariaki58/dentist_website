import Faq from "@/components/app-ui/about-us/Faq";
import ContactForm from "@/components/app-ui/contact/contact-form";
import ServiceHeader from "@/components/app-ui/services/service-header";

export default function Contact() {
    return (
        <div className="">
            <ServiceHeader btnText="Contact Us" content="Get More" title="Information" description="Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh." />
            <ContactForm />
            <Faq />
        </div>
    );
}
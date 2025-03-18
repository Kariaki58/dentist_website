import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function Faq() {
    return (
        <section className="max-w-4xl mx-auto px-6 md:px-12 py-16 space-y-8">
            <div className="flex justify-center">
                <Button
                    variant="outline"
                    className="py-2 px-6 text-orange-500 border-orange-500 hover:border-orange-600 hover:text-orange-600 cursor-auto bg-transparent"
                >
                    FAQ
                </Button>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-center">
                <span className="text-orange-500">Frequently </span>Asked Questions
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
                Have questions? We’ve got answers! Here are some of the most common inquiries we receive.
            </p>
            <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                        <AccordionTrigger className="text-lg md:text-xl font-medium">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}

const faqData = [
    {
        question: "How often should I have a dental check-up?",
        answer: "Regular dental check-ups are recommended every six months to ensure optimal oral health and catch any issues early."
    },
    {
        question: "What should I do if I have a dental emergency?",
        answer: "In case of a dental emergency, contact your dentist immediately. If you experience severe pain or bleeding, seek urgent care."
    },
    {
        question: "What is your approach to pain management during dental procedures?",
        answer: "We use the latest techniques and sedation options to ensure a comfortable, pain-free experience for all our patients."
    },
    {
        question: "What options are available for replacing missing teeth?",
        answer: "Our options include dental implants, bridges, and dentures, all customized to restore function and aesthetics."
    },
    {
        question: "How can I prepare my child for their first dental visit?",
        answer: "To prepare your child, keep a positive attitude, explain the process in simple terms, and consider a pre-visit tour of the clinic."
    }
];

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";


export default function Faq() {
    return (
        <section className="max-w-screen-lg mx-auto space-y-5 mb-20">
            <div className="flex justify-center">
                <Button variant="outline" className="py-3 w-52 ml-6 text-orange-500 hover:text-orange-600 cursor-auto bg-transparent outline-orange-400 border-orange-400 hover:bg-transparent">FAQ</Button>
            </div>
            <h2 className="text-5xl font-bold text-center"><span className="text-orange-500">Frequently </span>Asked Question</h2>
            <p className="text-gray-600 text-center px-64">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula aenean massa.
            </p>
            <Accordion type="single" collapsible className="w-full px-10">
                <AccordionItem value="item-1" >
                    <AccordionTrigger className="text-xl">How often should I have a dental check-up?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
                        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl">What should I do if I have a dental emergency?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                        Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et 
                        magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                        pellentesque eu, pretium quis, sem.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl">What is your approach to pain management during dental procedures?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                        Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et 
                        magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                        pellentesque eu, pretium quis, sem.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="text-xl">What options are available for replacing missing teeth?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                        Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et 
                        magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                        pellentesque eu, pretium quis, sem.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger className="text-xl">How can I prepare my child for their first dental visit?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                        Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et 
                        magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                        pellentesque eu, pretium quis, sem.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}
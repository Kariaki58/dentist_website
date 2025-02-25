import { Button } from "@/components/ui/button"
import { Send, MailOpen, PhoneCall, CalendarDays } from 'lucide-react';


export default function Form() {
    return (
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 bg-white p-5 items-end rounded-md space-y-3 max-w-6xl shadow-2xl shadow-[#FFF5E1]">
            <div className="space-y-3">
                <label htmlFor="name" className="flex gap-2"><MailOpen className="text-orange-500"/> Email Address</label>
                <input type="text" id="name" name="name" placeholder="Enter your Name" className="border-2 rounded-md p-2 w-full" required />
            </div>
            <div className="space-y-3">
                <label htmlFor="phone" className="flex gap-2"><PhoneCall className="text-orange-500"/> Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="Enter your Phone" className="border-2 rounded-md p-2 w-full" required />
            </div>
            <div className="space-y-3">
                <label htmlFor="date" className="flex gap-2"><CalendarDays className="text-orange-500"/> Date</label>
                <input type="date" id="date" name="date" placeholder="Enter Date" className="border-2 rounded-md p-2 w-full" required />
            </div>
            <Button className="bg-orange-500 p-8 hover:bg-orange-600 ml-5"><Send /> Book Now</Button>
        </form>
    )
}
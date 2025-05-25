'use client';

import { Button } from "@/components/ui/button";
import { Send, MailOpen, PhoneCall, CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { toast } from "sonner"

export default function Form() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, phone, date }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            toast("Success!", {
                description: "Email sent we would call you.",
            })

            // Reset form
            setEmail('');
            setPhone('');
            setDate('');
        } catch (error) {
            toast('Error',
                {
                    description: 'There was an error submitting your form. Please try again.',
                }
            );
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white p-5 items-end rounded-md shadow-2xl shadow-[#FFF5E1]"
        >
            <div className="space-y-2">
                <label htmlFor="email" className="flex gap-2 items-center">
                    <MailOpen className="text-orange-500 size-5" /> Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    className="border-2 rounded-md p-2 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                />
            </div>
        
            <div className="space-y-2">
                <label htmlFor="phone" className="flex gap-2 items-center">
                    <PhoneCall className="text-orange-500 size-5" /> Phone Number
                </label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your Phone"
                    className="border-2 rounded-md p-2 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                />
            </div>
        
            <div className="space-y-2">
                <label htmlFor="date" className="flex gap-2 items-center">
                    <CalendarDays className="text-orange-500 size-5" /> Date
                </label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border-2 rounded-md p-2 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                />
            </div>
        
            <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 h-12"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        <Send className="size-5" /> Book Now
                    </span>
                )}
            </Button>
        </form>
    );
}
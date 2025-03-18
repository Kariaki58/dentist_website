"use client";
import { useState } from "react";

export default function AppointmentForm() {
    const [time, setTime] = useState("");
    
    const availableTimes = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
        "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
        "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
        "05:00 PM"
    ];

    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white shadow-lg shadow-orange-100 rounded-lg max-w-3xl mx-auto">
            <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</label>
                <input type="text" id="name" name="name" placeholder="First name here" className="w-full p-3 border border-gray-300 mt-2 rounded-md focus:ring-orange-500 focus:border-orange-500" required />
            </div>

            <div className="flex flex-col">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Your Phone</label>
                <input type="text" id="phone" name="phone" placeholder="Telephone" className="w-full p-3 border border-gray-300 mt-2 rounded-md focus:ring-orange-500 focus:border-orange-500" required />
            </div>

            <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Your Email</label>
                <input type="email" id="email" name="email" placeholder="Add Email" className="w-full p-3 border border-gray-300 mt-2 rounded-md focus:ring-orange-500 focus:border-orange-500" required />
            </div>

            <div className="flex flex-col">
                <label htmlFor="date" className="text-sm font-medium text-gray-700">Date</label>
                <input type="date" id="date" name="date" className="w-full p-3 border border-gray-300 mt-2 rounded-md focus:ring-orange-500 focus:border-orange-500" required />
            </div>

            <div className="flex flex-col">
                <label htmlFor="time" className="text-sm font-medium text-gray-700">Time</label>
                <select id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-3 border border-gray-300 mt-2 rounded-md focus:ring-orange-500 focus:border-orange-500" required>
                    <option value="" disabled>Select a time</option>
                    {availableTimes.map((t, index) => (
                        <option key={index} value={t}>{t}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col md:col-span-2">
                <label htmlFor="service" className="text-sm font-medium text-gray-700">Select a Service</label>
                <select id="service" name="service" className="w-full p-3 border border-gray-300 mt-2 rounded-md focus:ring-orange-500 focus:border-orange-500" required>
                    <option>Service 1</option>
                    <option>Service 2</option>
                    <option>Service 3</option>
                </select>
            </div>

            <div className="flex flex-col md:col-span-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Additional Notes</label>
                <textarea id="message" name="message" className="w-full p-3 border border-gray-300 mt-2 rounded-md focus:ring-orange-500 focus:border-orange-500 min-h-[100px]" placeholder="Enter any additional details here..."></textarea>
            </div>

            <div className="md:col-span-2">
                <button type="submit" className="w-full bg-orange-500 p-3 text-white rounded-lg hover:bg-orange-600 transition-all duration-150 focus:ring-2 focus:ring-orange-300 focus:outline-none">
                    Book Appointment
                </button>
            </div>
        </form>
    );
}
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AppointmentForm() {
    const searchParams = useSearchParams();
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [selectedService, setSelectedService] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Business hours configuration
    const BUSINESS_HOURS = {
        start: 9, // 9 AM
        end: 17   // 5 PM
    };

    // Fetch services on component mount
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/api/services');
                const data = await response.json();
                setServices(data);
                
                // Check for service name in URL params
                const serviceName = searchParams.get('serviceName');
                if (serviceName && data.length > 0) {
                    const matchedService = data.find((s: any) => 
                        s.name.toLowerCase().includes(serviceName.replace('-', ' ').toLowerCase())
                    );
                    if (matchedService) {
                        setSelectedService(matchedService._id);
                    }
                } else if (data.length > 0) {
                    setSelectedService(data[0]._id);
                }
            } catch (error) {
                setError("Failed to load services. Please try again later.");
            }
        };
        
        fetchServices();
    }, [searchParams]);

    if (error) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                <p className="text-red-500 text-center">{error}</p>
            </div>
        );
    }
    
    // Format time to 12-hour format with AM/PM
    const formatTime = (hour: number, minute: string) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minute} ${period}`;
    };

    // Generate time slots based on current time for today
    const generateTimeSlotsForToday = () => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        // If it's past business hours for today, return empty array
        if (currentHour >= BUSINESS_HOURS.end) {
            return [];
        }
        
        // Calculate the next available slot (round up to next half hour)
        let nextAvailableHour = currentHour;
        let nextAvailableMinute = currentMinute < 30 ? '30' : '00';
        
        if (currentMinute >= 30) {
            nextAvailableHour += 1;
            nextAvailableMinute = '00';
        }
        
        // Ensure we don't start before business opening
        if (nextAvailableHour < BUSINESS_HOURS.start) {
            nextAvailableHour = BUSINESS_HOURS.start;
            nextAvailableMinute = '00';
        }
        
        // Generate slots from next available time to closing time
        const slots = [];
        let hour = nextAvailableHour;
        let minute = nextAvailableMinute;
        
        while (hour < BUSINESS_HOURS.end || 
            (hour === BUSINESS_HOURS.end && minute === '00')) {
            slots.push(formatTime(hour, minute));
            
            // Move to next slot
            if (minute === '00') {
                minute = '30';
            } else {
                minute = '00';
                hour += 1;
            }
        }
        
        return slots;
    };

    // Fetch available times when date or service changes
    useEffect(() => {
        if (date && selectedService) {
            const fetchAvailableTimes = async () => {
                setIsLoading(true);
                try {
                    const selectedDate = new Date(date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    // If selected date is today, generate time slots based on current time
                    if (selectedDate.getTime() === today.getTime()) {
                        const todaySlots = generateTimeSlotsForToday();
                        setAvailableTimes(todaySlots);
                    } else {
                        // For future dates, fetch from API
                        const response = await fetch(
                            `/api/appointments?date=${date}&serviceId=${selectedService}`
                        );
                        const data = await response.json();
                        setAvailableTimes(data.availableTimes || []);
                    }
                    
                    setTime(""); // Reset time selection when date changes
                } catch (error) {
                    setAvailableTimes([]);
                } finally {
                    setIsLoading(false);
                }
            };
            
            fetchAvailableTimes();
        }
    }, [date, selectedService]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    service: selectedService,
                    date: date
                }),
            });
            
            const result = await response.json();
            if (response.ok) {
                alert("Appointment booked successfully!");
                // Reset form
                (e.target as HTMLFormElement).reset();
                setDate("");
                setTime("");
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            alert("Failed to book appointment. Please try again.");
        }
    };
    
    return (
        <form 
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white shadow-lg shadow-orange-100 rounded-lg max-w-3xl mx-auto"
        >
            <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="First name here" 
                    className="w-full p-3 border border-gray-300 mt-2 rounded-md focus:ring-orange-500 focus:border-orange-500" 
                    required 
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Your Phone</label>
                <input 
                    type="text" 
                    id="phone" 
                    name="phone" 
                    placeholder="Telephone" 
                    className="w-full p-3 border border-gray-300 mt-2 rounded-md focus:ring-orange-500 focus:border-orange-500" 
                    required 
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Your Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Add Email" 
                    className="w-full p-3 border border-gray-300 mt-2 rounded-md focus:ring-orange-500 focus:border-orange-500" 
                    required 
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="date" className="text-sm font-medium text-gray-700">Date</label>
                <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    className="w-full p-3 border border-gray-300 mt-2 rounded-md focus:ring-orange-500 focus:border-orange-500" 
                    required 
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} // Disable past dates
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="time" className="text-sm font-medium text-gray-700">Time</label>
                <select 
                    id="time" 
                    name="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    className="w-full p-3 border border-gray-300 mt-2 rounded-md focus:ring-orange-500 focus:border-orange-500" 
                    required
                    disabled={!date || isLoading}
                >
                    <option value="" disabled>Select a time</option>
                    {availableTimes.map((t, index) => (
                        <option key={index} value={t}>{t}</option>
                    ))}
                    {availableTimes.length === 0 && date && (
                        <option disabled>
                            {new Date(date).toDateString() === new Date().toDateString() ? 
                             "No more available times for today" : 
                             "No available times for this date"}
                        </option>
                    )}
                </select>
            </div>

            <div className="flex flex-col md:col-span-2">
                <label htmlFor="service" className="text-sm font-medium text-gray-700">Select a Service</label>
                <select 
                    id="service" 
                    name="service" 
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full p-3 border border-gray-300 mt-2 rounded-md focus:ring-orange-500 focus:border-orange-500" 
                    required
                    disabled={services.length === 0}
                >
                    {services.length === 0 && (
                        <option>Loading services...</option>
                    )}
                    {services.map((service) => (
                        <option key={service._id} value={service._id}>
                            {service.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col md:col-span-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Additional Notes</label>
                <textarea 
                    id="message" 
                    name="message" 
                    className="w-full p-3 border border-gray-300 mt-2 rounded-md focus:ring-orange-500 focus:border-orange-500 min-h-[100px]" 
                    placeholder="Enter any additional details here..."
                ></textarea>
            </div>

            <div className="md:col-span-2">
                <button 
                    type="submit" 
                    className="w-full bg-orange-500 p-3 text-white rounded-lg hover:bg-orange-600 transition-all duration-150 focus:ring-2 focus:ring-orange-300 focus:outline-none"
                    disabled={isLoading || availableTimes.length === 0}
                >
                    {isLoading ? 'Booking...' : 'Book Appointment'}
                </button>
            </div>
        </form>
    );
}
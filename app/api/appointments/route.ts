import Appointment from "@/models/Appointment";
import AvailableSlot from "@/models/AvailableSlot";
import Service from "@/models/services";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Customer from "@/models/customer";

// Helper function to format time
const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hourNum = parseInt(hours);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
};

// GET available time slots for a specific date and service
export async function GET(request: Request) {
    try {
        await connectToDatabase();
        
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');
        const serviceId = searchParams.get('serviceId');
        
        if (!date || !serviceId) {
            return NextResponse.json(
                { error: "Date and serviceId are required" },
                { status: 400 }
            );
        }
        
        const selectedDate = new Date(date);
        const service = await Service.findById(serviceId);
        
        if (!service) {
            return NextResponse.json(
                { error: "Service not found" },
                { status: 404 }
            );
        }
        
        // Check if we have predefined slots for this date and service
        const existingSlot = await AvailableSlot.findOne({
            date: selectedDate,
            service: serviceId
        });
        
        if (existingSlot) {
            return NextResponse.json({
                availableTimes: existingSlot.availableTimes.filter((time: string) => {
                    return existingSlot.currentAppointments < existingSlot.maxAppointments;
                })
            });
        }
        
        // Default time slots if no specific slots are defined
        const defaultTimes = [
            '09:00', '09:30', '10:00', '10:30',
            '11:00', '11:30', '12:00', '12:30',
            '13:00', '13:30', '14:00', '14:30',
            '15:00', '15:30', '16:00', '16:30',
            '17:00'
        ].map(formatTime);
        
        return NextResponse.json({ availableTimes: defaultTimes });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch available times" },
            { status: 500 }
        );
    }
}

// POST create a new appointment
export async function POST(request: Request) {
    try {
        await connectToDatabase();
        
        const body = await request.json();
        const { name, phone, email, date, time, service, message } = body;
        
        // Find the service to validate it exists
        const serviceDoc = await Service.findById(service);
        if (!serviceDoc) {
            return NextResponse.json(
                { error: "Service not found" },
                { status: 404 }
            );
        }
        
        // Check if the slot is still available
        const selectedDate = new Date(date);
        const existingSlot = await AvailableSlot.findOne({
            date: selectedDate,
            service: service
        });
        
        if (existingSlot) {
            const formattedTime = time.replace(/(AM|PM)/, '').trim();
            const isAvailable = existingSlot.availableTimes.includes(formattedTime);
            
            if (!isAvailable || existingSlot.currentAppointments >= existingSlot.maxAppointments) {
                return NextResponse.json(
                    { error: "The selected time slot is no longer available" },
                    { status: 400 }
                );
            }
            
            // Increment the appointment count
            existingSlot.currentAppointments += 1;
            await existingSlot.save();
        }
        
        // Create the appointment
        const appointment = new Appointment({
            name,
            phone,
            email,
            date: selectedDate,
            time,
            service,
            message,
            status: 'pending'
        });

        await Customer.findOneAndUpdate(
            {
                $or: [
                    { email },
                    { phone }
                ]
            },
            { name, email, phone },
            { upsert: true, new: true }
        );          
        
        await appointment.save();
        
        return NextResponse.json({
            success: true,
            appointment
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create appointment" },
            { status: 500 }
        );
    }
}
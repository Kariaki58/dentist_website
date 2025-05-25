import connectToDatabase from "@/lib/mongoose";
import Appointment from "@/models/Appointment";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/options";
import { sendEmail } from "@/actions/sendEmail";

// Email templates
const emailTemplates = {
    bookingConfirmed: (appointment: any) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4CAF50;">Your Appointment Has Been Confirmed!</h2>
            <p>Hello ${appointment.name},</p>
            <p>We're pleased to inform you that your appointment has been confirmed.</p>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Appointment Details</h3>
                <p><strong>Service:</strong> ${appointment.service?.name || 'N/A'}</p>
                <p><strong>Date:</strong> ${new Date(appointment.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${appointment.time}</p>
            </div>
            
            <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
            <p>Thank you for choosing our service!</p>
            
            <div style="margin-top: 30px; font-size: 0.9em; color: #666;">
                <p>Best regards,</p>
                <p>The Booking Team</p>
            </div>
        </div>
    `,
    bookingDeclined: (appointment: any, reason?: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #F44336;">Appointment Update</h2>
            <p>Hello ${appointment.name},</p>
            <p>We regret to inform you that your appointment request could not be accommodated.</p>
            
            ${reason ? `
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h4 style="margin-top: 0;">Reason:</h4>
                <p>${reason}</p>
            </div>
            ` : ''}
            
            <p>We apologize for any inconvenience this may cause. Please feel free to book another appointment at a more convenient time.</p>
            
            <div style="margin-top: 30px; font-size: 0.9em; color: #666;">
                <p>Best regards,</p>
                <p>The Booking Team</p>
            </div>
        </div>
    `
};

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(options);
        
        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Check session role
        if (session.user.role !== 'admin') {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        await connectToDatabase();
        const user = await User.findById(session.user.id);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        if (user.role !== 'admin') {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { status, declineReason } = body;
        const { id } = await params;

        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { 
                status,
                ...(declineReason && { declineReason })
            },
            { new: true }
        ).populate('service');
        
        if (!appointment) {
            return NextResponse.json(
                { error: "Appointment not found" },
                { status: 404 }
            );
        }

        // Send appropriate email notification
        if (status === 'confirmed') {
            await sendEmail(
                appointment.email,
                `Appointment Confirmed - ${appointment.service?.name || 'Your Booking'}`,
                emailTemplates.bookingConfirmed(appointment)
            );
        } else if (status === 'cancelled') {
            await sendEmail(
                appointment.email,
                `Appointment Cancellation - ${appointment.service?.name || 'Your Booking'}`,
                emailTemplates.bookingDeclined(appointment, declineReason)
            );
        }

        return NextResponse.json(appointment);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update appointment" },
            { status: 500 }
        );
    }
}
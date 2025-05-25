import connectToDatabase from "@/lib/mongoose";
import Service from "@/models/services";
import Appointment from "@/models/Appointment";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { options } from "../../auth/options";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        
        const skip = (page - 1) * limit;
        const session = await getServerSession(options);
        
        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        // check session role
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
        
        const [appointments, total] = await Promise.all([
            Appointment.find()
                .populate('service')
                .sort({ date: 1, time: 1 })
                .skip(skip)
                .limit(limit),
            Appointment.countDocuments()
        ]);
        
        return NextResponse.json({
            bookings: appointments,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch appointments" },
            { status: 500 }
        );
    }
}
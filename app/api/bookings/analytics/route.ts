import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongoose";
import Appointment from "@/models/Appointment";
import { getServerSession } from "next-auth";
import { options } from "../../auth/options";

interface MonthlyData {
    month: string;
    bookings: number;
    cancellations: number;
}

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(options);
        const userId = session?.user?.id;
        if (!session || !userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        if (session.user.role !== "admin") {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        await connectToDatabase();

        const currentYear = new Date().getFullYear();

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        if (user.role !== "admin") {
            return NextResponse.json(
                { error: "Admin users cannot view their own analytics" },
                { status: 403 }
            );
        }

        // Step 1: Create an array of all months with initial counts set to zero
        const months: MonthlyData[] = [
            { month: "January", bookings: 0, cancellations: 0 },
            { month: "February", bookings: 0, cancellations: 0 },
            { month: "March", bookings: 0, cancellations: 0 },
            { month: "April", bookings: 0, cancellations: 0 },
            { month: "May", bookings: 0, cancellations: 0 },
            { month: "June", bookings: 0, cancellations: 0 },
            { month: "July", bookings: 0, cancellations: 0 },
            { month: "August", bookings: 0, cancellations: 0 },
            { month: "September", bookings: 0, cancellations: 0 },
            { month: "October", bookings: 0, cancellations: 0 },
            { month: "November", bookings: 0, cancellations: 0 },
            { month: "December", bookings: 0, cancellations: 0 },
        ];

        // Step 2: Perform the aggregation
        const aggregationResults = await Appointment.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lt: new Date(`${currentYear + 1}-01-01`),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        status: "$status",
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: "$_id.month",
                    bookings: {
                        $sum: {
                            $cond: [
                                { 
                                    $or: [
                                        { $eq: ["$_id.status", "pending"] },
                                        { $eq: ["$_id.status", "confirmed"] },
                                        { $eq: ["$_id.status", "completed"] }
                                    ] 
                                }, 
                                "$count", 
                                0
                            ],
                        },
                    },
                    cancellations: {
                        $sum: {
                            $cond: [
                                { $eq: ["$_id.status", "cancelled"] }, 
                                "$count", 
                                0
                            ],
                        },
                    },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        // Step 3: Merge the aggregation results with the months array
        aggregationResults.forEach((result) => {
            const monthIndex = result._id - 1;
            if (monthIndex >= 0 && monthIndex < months.length) {
                months[monthIndex].bookings = result.bookings;
                months[monthIndex].cancellations = result.cancellations;
            }
        });

        return NextResponse.json(months);
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
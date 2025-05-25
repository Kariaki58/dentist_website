import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/user";
import Customer from "@/models/customer";
import { getServerSession } from "next-auth";
import { options } from "../../auth/options";
import { ICustomer } from "@/models/customer";
import Appointment from "@/models/Appointment";


export async function GET(request: NextRequest) {
    try {
        // Check for session
        const session = await getServerSession(options);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // Check for admin role
        if (session.user.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        
        await connectToDatabase()
        
        // Parse query parameters
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        
        // Calculate skip value for pagination
        const skip = (page - 1) * limit
        
        // Fetch customers with pagination
        const customers = await Customer.find({})
            .select('name email phone createdAt')
            .skip(skip)
            .limit(limit)
            .lean<ICustomer[]>()
        
        // Get total count for pagination info
        const total = await Customer.countDocuments()
        
        // Get all customer emails in one array
        const customerEmails = customers.map(c => c.email)
        
        // Count bookings per customer in a single query
        const bookingsCount = await Appointment.aggregate([
            { 
                $match: { 
                    email: { $in: customerEmails } 
                } 
            },
            { 
                $group: { 
                    _id: "$email", 
                    count: { $sum: 1 } 
                } 
            }
        ])
        
        // Create a map for quick lookup of booking counts
        const bookingsMap = new Map(
            bookingsCount.map(item => [item._id, item.count])
        )
        
        // Transform customers to include dynamic booking counts
        const customersWithBookings = customers.map(customer => ({
            _id: customer._id.toString(),
            name: customer.name,
            phone: customer.phone || '',
            email: customer.email,
            date: new Date(customer.createdAt).toISOString().split('T')[0],
            bookings: bookingsMap.get(customer.email) || 0 // Dynamic booking count
        }))
        
        return NextResponse.json({
            customers: customersWithBookings,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalCustomers: total
            }
        }, { status: 200 })
        
    } catch (error) {
        console.error("Error fetching customers:", error);
        return NextResponse.json(
            { error: "Internal Server Error" }, 
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        
        const body = await req.json();
        const { name, email, phone } = body;
        const customer = new Customer({ name, email, phone });

        if (!phone) {
            return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
        }

        await customer.save();
        return NextResponse.json(customer, { status: 201 });
    } catch (error) {
        console.error("Error creating customer:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

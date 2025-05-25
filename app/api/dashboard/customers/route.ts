import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/user";
import Customer from "@/models/customer";
import { getServerSession } from "next-auth";
import { options } from "../../auth/options";
import { ICustomer } from "@/models/customer";


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
        
        // Fetch users with pagination
        const customer = await Customer.find({})
            .select('name email phone createdAt')
            .skip(skip)
            .limit(limit)
            .lean<ICustomer[]>()
        
        // Get total count for pagination info
        const total = await User.countDocuments()
        
        // Transform users to match your frontend expectations
        const customers = customer.map(cos => ({
            _id: cos._id.toString(),
            name: cos.name,
            phone: cos.phone || '',
            email: cos.email,
            date: new Date(cos.createdAt).toISOString().split('T')[0],
            bookings: 0 // Initial booking count of 0
        }))
        
        return NextResponse.json({
            customers,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalCustomers: total
            }
        }, { status: 200 })
        
    } catch (error) {
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
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}



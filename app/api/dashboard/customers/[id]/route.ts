import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongoose";
import Customer from "@/models/customer";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/options";


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

        await connectToDatabase();

        const user = await User.findById(session.user.id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if (user.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const customerId = (await params).id;
        const customer = await Customer.findById(customerId);

        if (!customer) {
            return NextResponse.json({ error: "Customer not found" }, { status: 404 });
        }

        await Customer.deleteOne({ _id: customerId });

        return NextResponse.json({ message: "Customer deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting customer:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
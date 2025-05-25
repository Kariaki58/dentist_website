import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { options } from "../../auth/options";
import Service from "@/models/services";
import User from "@/models/user";


export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const getAllServices = await Service.find({});


        return NextResponse.json({ message: getAllServices }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to Load Services" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(options);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }
        
        await connectToDatabase();

        const user = await User.findById(session.user.id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const body = await req.json();
        const { serviceName, description, price, duration, image } = body;
        
        if (!serviceName || !description || !price || !duration || !image) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        const newService = new Service({
            name: serviceName,
            description,
            price,
            duration,
            image,
        });
        await newService.save();

        return NextResponse.json({ message: "Service created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

import connectToDatabase from "@/lib/mongoose";
import Service from "@/models/services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await connectToDatabase();
        
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');
        
        let services;
        if (name) {
            services = await Service.findOne({ name: new RegExp(name, 'i') });
        } else {
            services = await Service.find({});
        }
        
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch services" },
            { status: 500 }
        );
    }
}
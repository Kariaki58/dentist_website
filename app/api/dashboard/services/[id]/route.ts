import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { deleteImage } from "@/utils/image-functions";
import mongoose from "mongoose";
import Service from "@/models/services";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/options";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    if (!id) {
        return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid Service ID" }, { status: 400 });
    }
    try {
        await connectToDatabase();
        const getService = await Service.findById(id);

        return NextResponse.json({ message: getService }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to Load Services" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    const body = await req.json();

    const session = await getServerSession(options);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    
    if (!id) {
        return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid Service ID" }, { status: 400 });
    }
    try {
        await connectToDatabase();

        if (body.image) {
            const existingService = await Service.findById(id);
            if (!existingService) {
                return NextResponse.json({ error: "Service not found" }, { status: 404 });
            }

            const parts = existingService.image.split('/');
            const fileName = parts[parts.length - 1];
            const publicId = fileName.split('.')[0];


            if (publicId) {
                await deleteImage(publicId);
            }
        }
        const edited = await Service.findOneAndUpdate({ _id: id }, body, { new: true })
        return NextResponse.json({ message: "Service Updated Successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to Load Services" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(options);
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid Service ID" }, { status: 400 });
    }

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    try {
        await connectToDatabase();
        const response = await Service.findByIdAndDelete(id);
        
        const parts = response.image.split('/');
        const fileName = parts[parts.length - 1];
        const publicId = fileName.split('.')[0];


        if (publicId) {
            await deleteImage(publicId);
        }
        return NextResponse.json({ message: "Service Deleted Successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to Load Services" }, { status: 500 });
    }
}

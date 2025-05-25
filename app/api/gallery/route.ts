// app/api/gallery/route.ts
import { NextRequest, NextResponse } from "next/server";
import GalleryImage from "@/models/gallery";
import connectToDatabase from "@/lib/mongoose";


export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '5');

        const skip = (page - 1) * limit;

        const images = await GalleryImage.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

        const total = await GalleryImage.countDocuments();

        return NextResponse.json({
            images,
            total,
            page,
            pages: Math.ceil(total / limit),
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch gallery images" },
            { status: 500 }
        );
    }
}

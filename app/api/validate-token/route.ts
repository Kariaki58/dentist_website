import { NextRequest, NextResponse } from "next/server";
import ReviewToken from "@/models/ReviewToken";
import connectToDatabase from "@/lib/mongoose";


export async function GET(request: NextRequest) {
    await connectToDatabase();
    
    const token = request.nextUrl.searchParams.get('token');
    
    if (!token) {
        return NextResponse.json(
            { valid: false, message: "Token is required" },
            { status: 400 }
        );
    }

    try {
        const reviewToken = await ReviewToken.findOne({ 
            token,
            isUsed: false,
            expiresAt: { $gt: new Date() }
        });

        return NextResponse.json(
            { valid: !!reviewToken },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { valid: false, message: "Error validating token" },
            { status: 500 }
        );
    }
}
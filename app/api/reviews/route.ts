import { NextRequest, NextResponse } from "next/server";
import Review from "@/models/reviews";
import ReviewToken from "@/models/ReviewToken";
import connectToDatabase from "@/lib/mongoose";

export async function POST(request: Request) {
    
    try {
        await connectToDatabase();

        const body = await request.json();
        const { token, ...reviewData } = body;

        // Validate the token
        const reviewToken = await ReviewToken.findOne({ 
            token,
            isUsed: false,
            expiresAt: { $gt: new Date() }
        });

        const reviewTokensearch = await ReviewToken.findOne({ token })

        if (!reviewToken) {
            return NextResponse.json(
                { message: "Invalid or expired review token" },
                { status: 400 }
            );
        }

        // Reputation management
        let status: 'approved' | 'pending' = 'pending';
        if (reviewData.rating >= 4) {
            status = 'approved';
        }

        // Create the review
        const review = new Review({
            ...reviewData,
            email: reviewToken.email,
            status,
            tokenUsed: token
        });

        await review.save();

        // Mark token as used
        reviewToken.isUsed = true;
        await reviewToken.save();

        return NextResponse.json(
            {
                review,
                message: status === 'approved' 
                    ? "Thank you for your review!" 
                    : "Thank you for your review!"
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to submit review" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get("limit") || "10");
        const page = parseInt(searchParams.get("page") || "1");

        const skip = (page - 1) * limit;

        const [reviews, total] = await Promise.all([
            Review.find({ status: 'approved' }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            Review.countDocuments(),
        ]);

        const plainReviews = reviews.map((review) => ({
            ...review,
            _id: review._id.toString(),
            createdAt: review.createdAt?.toString(),
            updatedAt: review.updatedAt?.toString(),
        }));

        return NextResponse.json({
            reviews: plainReviews,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}
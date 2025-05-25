import { NextResponse } from "next/server";
import ReviewToken from "@/models/ReviewToken";
import connectToDatabase from "@/lib/mongoose";
import { v4 as uuidv4 } from 'uuid';
import { addDays } from 'date-fns';
import { sendEmail } from "@/actions/sendEmail";
import { getServerSession } from "next-auth";
import { options } from "../auth/options";
import User from "@/models/user";


export async function POST(request: Request) {
    const session = await getServerSession(options);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    await connectToDatabase();

    const user = await User.findById(session.user.id);
        
    if (!user || user.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    try {
        const { email } = await request.json();
        
        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        const token = uuidv4();
        const expiresAt = addDays(new Date(), 7); // Token expires in 7 days

        const reviewToken = new ReviewToken({
            token,
            email,
            expiresAt
        });

        await reviewToken.save();

        // In production, you would send this link via email
        const reviewLink = `${process.env.NEXTAUTH_URL}/review?token=${token}`;

        const emailSent = await sendEmail(
            email,
            "Please Share Your Feedback",
            generateReviewEmailHtml("Customer", reviewLink)
        );

        if (!emailSent) {
            return NextResponse.json(
                { message: "Failed to send review link email" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { 
                message: "Review token generated",
                token,
                reviewLink,
                expiresAt
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to generate token" },
            { status: 500 }
        );
    }
}

function generateReviewEmailHtml(name: string, reviewLink: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { color: #4a5568; }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #ed8936;
                color: white !important;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                margin: 20px 0;
            }
            .footer { margin-top: 30px; font-size: 14px; color: #718096; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 class="header">Hi ${name},</h1>
            <p>We would love to hear about your experience with us!</p>
            <p>Please take a moment to share your feedback by clicking the button below:</p>
            
            <a href="${reviewLink}" class="button">Leave Your Review</a>
            
            <p>This link will expire in 7 days.</p>
            
            <div class="footer">
                <p>If you didn't request this, please ignore this email.</p>
                <p>Best regards,<br>The Team</p>
            </div>
        </div>
    </body>
    </html>
    `;
}
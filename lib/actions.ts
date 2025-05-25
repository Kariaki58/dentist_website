'use server';

import { v4 as uuidv4 } from 'uuid';
import { addDays } from 'date-fns';
import Review from '@/models/reviews';
import ReviewToken from '@/models/ReviewToken';
import connectToDatabase from './mongoose';
import { sendEmail } from '@/actions/sendEmail';
import Appointment from '@/models/Appointment';
import { options } from '@/app/api/auth/options';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import User from '@/models/user';


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


export async function generateToken(email: string) {
    await connectToDatabase();
    
    try {
        const token = uuidv4();
        const expiresAt = addDays(new Date(), 7);

        const name = await Appointment.findOne({ email: email }, 'name').exec();
        if (!name) {
            return { error: "No appointment found for this email" };
        }

        const reviewToken = new ReviewToken({
            token,
            email,
            expiresAt
        });

        await reviewToken.save();        

        const reviewLink = `${process.env.NEXTAUTH_URL}/review?token=${token}`;

        const emailSent = await sendEmail(
            email,
            "Please Share Your Feedback",
            generateReviewEmailHtml(name.name, reviewLink)
        );
        
        if (!emailSent) {
            return { error: "Failed to send review link email" }
        }
        return { 
            token,
            reviewLink
        };
    } catch (error) {
        return { error: 'Failed to generate token' };
    }
}

export async function approveReview(reviewId: string) {
    try {
        const session = await getServerSession(options);

        if (!session || !session.user) {
            throw new Error("Unauthorized")
        }
        // check session role
        if (session.user.role !== 'admin') {
            throw new Error("Forbidden")
        }
        
        await connectToDatabase();

        const user = await User.findById(session.user.id);

        if (!user) {
            throw new Error("User not found")
        }
        if (user.role !== 'admin') {
            throw new Error("Forbidden")
        }

        await Review.findByIdAndUpdate(reviewId, { status: 'approved' });
        
        revalidatePath('/admin/reviews'); // Update this path as needed
        return { success: true };
    } catch (error) {
        throw new Error('Failed to approve review');
    }
}

export async function rejectReview(reviewId: string) {
    try {
        const session = await getServerSession(options);

        if (!session || !session.user) {
            throw new Error("Unauthorized")
        }
        // check session role
        if (session.user.role !== 'admin') {
            throw new Error("Forbidden")
        }
        
        await connectToDatabase();

        const user = await User.findById(session.user.id);

        if (!user) {
            throw new Error("User not found")
        }
        if (user.role !== 'admin') {
            throw new Error("Forbidden")
        }

        await Review.findByIdAndUpdate(reviewId, { status: 'rejected' });
        revalidatePath('/admin/reviews'); // Update this path as needed
        await Review.findByIdAndDelete(reviewId);
        return { success: true };
    } catch (error) {
        throw new Error('Failed to reject review');
    }
}


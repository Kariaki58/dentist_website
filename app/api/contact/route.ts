// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/actions/sendEmail';

const schema = z.object({
    email: z.string().email(),
    phone: z.string().min(6),
    date: z.string(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = schema.parse(body);


        // Email options
        const html = `
            <h1>New Booking Request</h1>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Phone:</strong> ${validatedData.phone}</p>
            <p><strong>Date:</strong> ${validatedData.date}</p>
        `;

        const subject = 'New Booking Request';
        const emailSent = await sendEmail(
            process.env.EMAIL_ADDRESS || '',
            subject,
            html
        );

        if (!emailSent) {
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }
        
        


        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        if (error instanceof z.ZodError) {
        return NextResponse.json(
            { error: error.errors },
            { status: 400 }
        );
        }
        return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
        );
    }
}
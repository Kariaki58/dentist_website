"use server";
import nodemailer from "nodemailer";
import { SentMessageInfo } from 'nodemailer';

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail(email: string, subject: string, html: string): Promise<boolean> {
    try {
        if (!process.env.EMAIL_ADDRESS || !process.env.APP_PASSWORD) {
            throw new Error("Email credentials not configured");
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.APP_PASSWORD,
            },
        });

        const mailOptions: MailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject,
            html,
        };

        const info: SentMessageInfo = await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return false;
    }
}

export async function sendInquire(subject: string, html: string): Promise<boolean> {
    try {
        if (!process.env.EMAIL_ADDRESS || !process.env.APP_PASSWORD) {
            throw new Error("Email credentials not configured");
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.APP_PASSWORD,
            },
        });

        const mailOptions: MailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: process.env.EMAIL_ADDRESS,
            subject,
            html,
        };

        const info: SentMessageInfo = await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return false;
    }
}
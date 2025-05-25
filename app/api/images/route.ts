import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/user";
import { options } from "../auth/options";
import cloudinary from "@/lib/cloudinary";


export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(options);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const userId = session.user.id;
        if (!userId) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        // check the role of the session
        const userRole = user.role;
        if (userRole !== "admin") {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const content = await req.formData();

        const image = content.get("image") as File;

        if (!image || !(image instanceof File)) {
            return NextResponse.json({ message: "Invalid image" }, { status: 400 });
        }
        const arrayBuffer = await image.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        let imageUrl = "";


        await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (error: any, result: any) => {
                if (error) {
                    reject(error);
                }
                if (result && result.secure_url) {
                    imageUrl = result.secure_url;
                    resolve(result);
                } else {
                    reject(new Error('Failed to upload image'));
                }
            }
            ).end(buffer);
        });

        if (!imageUrl) {
            return NextResponse.json({ message: "Failed to upload image" }, { status: 500 });
        }

        return NextResponse.json({ message: imageUrl }, { status: 201 });
    } catch (error) {
        console.error("Error uploading image:", error);
        
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
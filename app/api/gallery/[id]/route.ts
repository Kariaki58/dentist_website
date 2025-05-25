import { NextRequest, NextResponse } from "next/server";
import GalleryImage from "@/models/gallery";
import connectToDatabase from "@/lib/mongoose";
import { deleteImage } from "@/utils/image-functions";
import { getServerSession } from "next-auth";
import { options } from "../../auth/options";
import User from "@/models/user";


// delete image
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const { id } = await params;


        if (!id) {
            return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
        }
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


        

        // Find and delete the image
        const deletedImage = await GalleryImage.findByIdAndDelete(id);
        if (!deletedImage) {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        // Delete the image file from storage
        const public_Id = deletedImage.url.split("/").pop()?.split(".")[0];
        if (!public_Id) {
            return NextResponse.json({ error: "Invalid image path" }, { status: 400 });
        }
        await deleteImage(public_Id);

        return NextResponse.json({ message: "Image deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete image" },
            { status: 500 }
        );
    }
}
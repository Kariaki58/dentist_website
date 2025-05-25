import { options } from "../../auth/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import Team from "@/models/teams";
import cloudinary from "@/lib/cloudinary";


export async function GET(req: NextRequest) {
    try {
        const teams = await Team.find();
        return NextResponse.json(teams, { status: 200 });
    } catch (error) {
        console.error("Error fetching team members:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(options);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = session.user.id;

        if (!userId) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (user.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const content = await req.formData();
        const name = content.get("name") as string;
        const role = content.get("role") as string;
        const imageFile = content.get("image") as File;

        if (!name || !role || !imageFile || !(imageFile instanceof File)) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const arrayBuffer = await imageFile.arrayBuffer();
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
            }).end(buffer);
        });

        if (!imageUrl) {
            return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
        }

        const newTeamMember = new Team({
            name,
            role,
            image: imageUrl,
        });

        await newTeamMember.save();

        return NextResponse.json(newTeamMember, { status: 201 });
    } catch (error) {
        console.error("Error creating team member:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
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

        const { searchParams } = new URL(req.url);
        const teamId = searchParams.get("id");

        if (!teamId) {
            return NextResponse.json({ message: "Team ID is required" }, { status: 400 });
        }

        const deletedTeamMember = await Team.findByIdAndDelete(teamId);
        // delete team member as well.
        if (!deletedTeamMember) {
            return NextResponse.json({ message: "Team member not found" }, { status: 404 });
        }

        return NextResponse.json(deletedTeamMember, { status: 200 });
    } catch (error) {
        console.error("Error deleting team member:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}




import { options } from "@/app/api/auth/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import Team from "@/models/teams";
import { deleteImage } from "@/utils/image-functions";

function getCloudinaryPublicId(imageUrl: string): string | null {
    const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/;
    const match = imageUrl.match(regex);
    return match ? match[1] : null;
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(options);
        const { id } = await params;
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

        const teamMember = await Team.findByIdAndDelete(id);
        if (!teamMember) {
            return NextResponse.json({ error: "Team member not found" }, { status: 404 });
        }
        // Delete the image associated with the team member
        if (teamMember.image) {
            const publicId = getCloudinaryPublicId(teamMember.image);
            if (publicId) {
                await deleteImage(publicId);
            }
        }

        return NextResponse.json({ message: "Team member deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
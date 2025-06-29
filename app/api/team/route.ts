import { NextResponse } from "next/server";
import Team from "@/models/teams";
import connectToDatabase from "@/lib/mongoose";

export interface TeamMember {
  _id: string;
  name: string;
  image: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function GET() {
  try {
    await connectToDatabase();

    const rawMembers = await Team.find().sort({ createdAt: -1 }).lean();

    const teamMembers: TeamMember[] = rawMembers.map((member) => ({
      _id: member._id.toString(),
      name: member.name,
      image: member.image,
      role: member.role,
      createdAt: member.createdAt?.toString(),
      updatedAt: member.updatedAt?.toString(),
    }));

    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { error: "Unable to fetch team members" },
      { status: 500 }
    );
  }
}
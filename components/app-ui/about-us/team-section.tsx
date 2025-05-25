import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctor from "@/public/home-images/doctor.png";
import Team from "@/models/teams";
import connectToDatabase from "@/lib/mongoose";

interface TeamMember {
    name: string;
    _id: string;
    name: string;
    specialty: string;
}

export default async function TeamSection() {
    await connectToDatabase();
    const teamMembers: TeamMember[] = await Team.find()
        .sort({ createdAt: -1 })
        .lean()
        .then(members =>
            members.map(member => ({
            ...member,
            _id: member._id.toString(), // convert ObjectId to string
            createdAt: member.createdAt?.toString(), // optional: convert Date to string
            updatedAt: member.updatedAt?.toString(), // same
            // don't include Buffer or large binary data here
            }))
        );

        
    return (
        <section className="max-w-screen-lg mx-auto my-20 px-4">
            <div className="flex flex-col justify-center items-center space-y-4 text-center">
                <Button variant="outline" className="py-3 text-orange-500 hover:text-orange-600 cursor-auto mb-2">
                    Our Team
                </Button>
                <h2 className="text-3xl md:text-5xl font-bold">
                    Our Expert <span className="text-orange-500">Dentist</span>
                </h2>
                <p className="max-w-xl text-gray-500 text-sm md:text-base">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
                    Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                </p>
            </div>
            
            {/* Updated team members grid */}
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div 
                            key={member._id}
                            className={`bg-orange-200 rounded-lg relative p-5 ${
                                // This will make the first card in the center when there's an odd number
                                teamMembers.length % 2 === 1 && index === 0 ? "md:col-start-2" : ""
                            }`}
                        >
                            <div className="flex flex-col justify-center items-center">
                                <Image
                                    src={member.image}
                                    alt={`Team Member ${index + 1}`}
                                    width={250}
                                    height={250}
                                    className="rounded-full object-cover"
                                />
                                <div className="text-center bg-white p-4 rounded-md absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 shadow-md w-4/5">
                                    <h3 className="text-xl md:text-2xl font-bold">{member.name || "Dr. John Doe"}</h3>
                                    <p className="text-gray-500 text-sm md:text-base">{member.specialty || "Dentist"}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
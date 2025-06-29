"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

interface TeamMember {
  _id: string;
  name: string;
  image: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/team", {
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }

        const data = await response.json();
        setTeamMembers(data);
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError("Unable to load team members at this time. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <section className="max-w-screen-lg mx-auto my-20 px-4">
      <div className="flex flex-col justify-center items-center space-y-4 text-center">
        <Button
          variant="outline"
          className="py-3 text-orange-500 hover:text-orange-600 cursor-auto mb-2"
        >
          Our Team
        </Button>
        <h2 className="text-3xl md:text-5xl font-bold">
          Our Expert <span className="text-orange-500">Dentist</span>
        </h2>
        <p className="max-w-xl text-gray-500 text-sm md:text-base">
          Meet our dedicated team of highly skilled dentists, committed to delivering
          exceptional care using the latest techniques and a patient-first approach.
        </p>
      </div>

      {/* Display loading, error, or team members */}
      <div className="flex justify-center">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading team members...</p>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 mt-8">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
            {teamMembers.length > 0 ? (
              teamMembers.map((member, index) => (
                <div
                  key={member._id}
                  className={`bg-orange-200 rounded-lg relative p-5 ${
                    teamMembers.length % 2 === 1 && index === 0 ? "md:col-start-2" : ""
                  }`}
                >
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      src={member.image || "/default-profile.png"}
                      alt={`Team Member ${member.name}`}
                      width={250}
                      height={250}
                      className="rounded-full object-cover"
                    />
                    <div className="text-center bg-white p-4 rounded-md absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 shadow-md w-4/5">
                      <h3 className="text-xl md:text-2xl font-bold">{member.name}</h3>
                      <p className="text-gray-500 text-sm md:text-base">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No team members found at the moment.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
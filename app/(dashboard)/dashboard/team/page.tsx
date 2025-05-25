"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus } from "lucide-react";

interface TeamMember {
    _id: number;
    name: string;
    role: string;
    image: string;
}

export default function DashboardTeamPage() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [newMember, setNewMember] = useState({ 
        name: "", 
        role: "", 
        avatar: "" 
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // Fetch team members from API
    useEffect(() => {
        const fetchTeamMembers = async () => {
        try {
            const response = await fetch("/api/dashboard/team");
            if (!response.ok) {
            throw new Error("Failed to fetch team members");
            }
            const data = await response.json();
            setTeam(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
        };

        fetchTeamMembers();
    }, []);

    const handleAdd = async () => {
        const { name, role, avatar } = newMember;

        if (!name || !role || !avatar) {
            setError("Please fill out all fields and select an avatar.");
            return;
        }
        setIsAdding(true);
        setError("");


        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("role", role);
            
            // If avatar is a file (from file input)
            if (avatar.startsWith("blob:")) {
                const blob = await fetch(avatar).then(r => r.blob());
                formData.append("image", blob);
            } else {
                // If avatar is a URL (from existing data)
                formData.append("avatar", avatar);
            }

            const response = await fetch("/api/dashboard/team", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to add team member");
            }

            const newMemberData = await response.json();
            setTeam([...team, newMemberData]);
            setNewMember({ name: "", role: "", avatar: "" });
            setError("");
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setIsAdding(false); // Set loading state to false when done
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/dashboard/team/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete team member");
            }

            setTeam(team.filter((member) => member._id !== id));
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMember({ ...newMember, [e.target.name]: e.target.value });
    };

    if (isLoading) {
        return (
        <div className="p-6 flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Team Members</h2>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {team.length > 0 ? (
            team.map((member) => (
                <Card key={member._id} className="rounded-2xl shadow-lg">
                <CardContent className="p-4 flex flex-col items-center text-center">
                    <img
                    src={member.image}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="rounded-full mb-3 w-20 h-20 object-cover"
                    />
                    <p className="font-semibold text-lg">{member.name}</p>
                    <p className="text-gray-500">{member.role}</p>
                    <div className="flex space-x-3 mt-4">
                    <Button variant="ghost" size="icon">
                        <Pencil className="w-5 h-5 text-blue-500" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(member._id)}
                    >
                        <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>
                    </div>
                </CardContent>
                </Card>
            ))
            ) : (
            <p className="text-gray-500">No team members found</p>
            )}
        </div>

        <div className="mt-10 space-y-4">
            <h3 className="text-xl font-medium">Add Team Member</h3>
            <div className="grid md:grid-cols-3 gap-4">
            <Input
                placeholder="Name"
                name="name"
                value={newMember.name}
                onChange={handleInputChange}
            />
            <Input
                placeholder="Role"
                name="role"
                value={newMember.role}
                onChange={handleInputChange}
            />
            <div className="flex items-center gap-4">
                <label
                htmlFor="avatar"
                className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-md"
                >
                Choose Avatar
                </label>
                <input
                id="avatar"
                type="file"
                name="avatar"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                    const url = URL.createObjectURL(file);
                    setNewMember({ ...newMember, avatar: url });
                    }
                }}
                />
                {newMember.avatar && (
                <img
                    src={newMember.avatar}
                    alt="Preview"
                    className="w-10 h-10 rounded-full object-cover"
                />
                )}
            </div>
            </div>
            <Button
                onClick={handleAdd}
                disabled={isAdding}
                className="mt-2 flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
            >
                {isAdding ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                    </>
                    ) : (
                    <>
                        <Plus className="w-4 h-4" /> Add Member
                    </>
                    )}
            </Button>
        </div>
        </div>
    );
}
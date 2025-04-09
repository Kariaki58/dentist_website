"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus } from "lucide-react";

const initialTeam = [
    {
        id: 1,
        name: "Jane Doe",
        role: "Product Manager",
        avatar: "/profile/profile-1.jpg",
    },
    {
        id: 2,
        name: "John Smith",
        role: "Developer",
        avatar: "/profile/profile-2.jpg",
    },
];

export default function DashboardTeamPage() {
    const [team, setTeam] = useState(initialTeam);
    const [newMember, setNewMember] = useState({ name: "", role: "", avatar: "" });
    const [error, setError] = useState("");

    const handleAdd = () => {
    const { name, role, avatar } = newMember;

        // ✅ Basic form validation
        if (!name || !role || !avatar) {
            setError("Please fill out all fields and select an avatar.");
            return;
        }

        const newId = Date.now();
        setTeam([...team, { id: newId, ...newMember }]);

        // ✅ Reset state
        setNewMember({ name: "", role: "", avatar: "" });
        setError(""); // clear error
    };

    const handleDelete = (id: number) => {
        setTeam(team.filter((member) => member.id !== id));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMember({ ...newMember, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Team Members</h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {team.map((member) => (
            <Card key={member.id} className="rounded-2xl shadow-lg">
                <CardContent className="p-4 flex flex-col items-center text-center">
                <img
                    src={member.avatar}
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
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id)}>
                    <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>

        <div className="mt-10 space-y-4">
            <h3 className="text-xl font-medium">Add Team Member</h3>
            {error && <p className="text-red-600 text-sm">{error}</p>}
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
            className="mt-2 flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
            >
            <Plus className="w-4 h-4" /> Add Member
            </Button>
        </div>
        </div>
    );
}

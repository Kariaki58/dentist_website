"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminButton() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleClick = () => {
        if (!session) {
            router.push("/api/auth/signin");
        } else if (session.user?.role === "admin") {
            router.push("/dashboard");
        } else {
            router.push("/");
        }
    };

    return (
        <button 
            onClick={handleClick} 
            className="bg-white p-2 rounded-lg hover:bg-gray-300"
        >
            Admin Access
        </button>
    );
}

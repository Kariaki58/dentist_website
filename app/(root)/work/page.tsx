"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Page() {
    const { data: session } = useSession();
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="inline-block w-full">
                {JSON.stringify(session)}
            </div>
            <br />
            <button onClick={() => signOut()} className="bg-blue-700 p-4 inline-block w-full">LOGOUT</button>
        </div>
    )
}
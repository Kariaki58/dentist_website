"use client";
import { useSession } from "next-auth/react"

export default function ShowData() {
    const { data: session } = useSession()
    return (
        <div className="mt-96">
            here
            {JSON.stringify(session)}
        </div>
    )
}
"use client";

import { useRouter } from "next/navigation";

interface ErrorComponentProps {
    error: string;
}

export function HandleError({ error }: ErrorComponentProps) {
    const router = useRouter();
    
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Occurred</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
            onClick={() => router.refresh()} 
            className="inline-block bg-orange-500 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
            Refresh Page
            </button>
        </div>
        </main>
    )
}
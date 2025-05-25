import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { getServerSession } from "next-auth"
import { options } from "../api/auth/options"
import connectToDatabase from "@/lib/mongoose"
import Link from "next/link"
import { HandleError } from "./error/error"
import User from "@/models/user"


export default async function DashboardLayout({ children }: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(options);
    const error: string | null = null;

    if (!session || !session?.user) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                    <div className="text-red-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
                    <p className="text-gray-600 mb-6">You need to be logged in to access this page.</p>
                    <Link href="/api/auth/signin" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition duration-200">
                        Go to Login
                    </Link>
                </div>
            </main>
        )
    }

    if (session?.user?.role !== "admin") {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                    <div className="text-yellow-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Unauthorized</h2>
                    <p className="text-gray-600 mb-6">You don't have permission to access this resource.</p>
                    <Link href="/" className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-md transition duration-200">
                        Return Home
                    </Link>
                </div>
            </main>
        )
    }

    try {
        await connectToDatabase();
        const user = await User.findById(session?.user?.id);
        
        if (!user) {
            return (
                <main className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                        <div className="text-red-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">User Not Found</h2>
                        <p className="text-gray-600 mb-6">The account associated with your session could not be found.</p>
                        <Link href="/logout" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition duration-200">
                            Logout
                        </Link>
                    </div>
                </main>
            )
        }
        
        if (user.role !== "admin") {
            return (
                <main className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                        <div className="text-yellow-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Restricted</h2>
                        <p className="text-gray-600 mb-6">Admin privileges are required for this action.</p>
                        <Link href="/" className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-md transition duration-200">
                            Go Home
                        </Link>
                    </div>
                </main>
            )
        }
        
    } catch (error) {
        error = "Something went wrong. Please refresh the page or check your internet connection.";
    }

    if (error) {
        return <HandleError error={error} />
    }
    return (
        <main>
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                <SiteHeader />
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </main>
    )
}
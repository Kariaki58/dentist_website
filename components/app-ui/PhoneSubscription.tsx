"use client"
import { Button } from "flowbite-react";
import { useState } from "react";

export default function PhoneSubscription() {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        if (!phone) {
            setError("Please enter a valid phone number.");
            setSuccess("");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("/api/dashboard/customers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phone }),
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                setError(data.error || "Failed to subscribe.");
                setSuccess("");
            } else {
                setSuccess("Subscribed successfully!");
                setPhone("");
            }
        } catch (error) {
            setError("An error occurred while subscribing. Please try again.");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md">
            <h2 className="text-white text-2xl font-semibold mb-3">Get Appointment Reminders</h2>
            <p className="text-orange-100 mb-4 text-sm">
                Subscribe with your phone number to receive appointment updates and reminders.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-2 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <Button
                    onClick={handleSubscribe}
                    isProcessing={loading}
                    className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto"
                >
                    {loading ? "Subscribing..." : "Subscribe"}
                </Button>
            </div>

            {/* Display Messages */}
            {error && (
                <p className="text-red-500 mt-3 text-sm">{error}</p>
            )}
            {success && (
                <p className="text-green-500 mt-3 text-sm">{success}</p>
            )}
        </div>
    );
}

'use client';

import { useState } from 'react';
import { generateToken } from '@/lib/actions';

export default function GenerateTokensPage() {
    const [email, setEmail] = useState('');
    const [generatedToken, setGeneratedToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        try {
            const result = await generateToken(email);
            if (result.error) {
                setError(result.error);
            } else {
                setGeneratedToken(result.token ?? null);
            }
        } catch (err) {
            setError('Failed to generate token');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='p-6 bg-white rounded shadow-md max-w-lg mx-auto'>
        <h1 className="text-2xl font-bold mb-6">Generate Review Token</h1>
        
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <div>
            <label htmlFor="email" className="block mb-2 font-medium">
                Customer Email
            </label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
            />
            </div>
            
            <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-700 disabled:bg-gray-400"
            >
            {isLoading ? 'Generating...' : 'Generate Token'}
            </button>
        </form>

        {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
            {error}
            </div>
        )}

        {generatedToken && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h2 className="font-bold mb-2">Generated Token:</h2>
            <div className="p-3 bg-white rounded border break-all mb-2">
                {generatedToken}
            </div>
            <p className="text-sm text-gray-600">
                Share this link with the customer: <br />
                <span className="text-blue-600">
                {window.location.origin}/review?token={generatedToken}
                </span>
            </p>
            </div>
        )}
        </div>
    );
}
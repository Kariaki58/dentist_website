'use client';

import { useState } from 'react';

interface ReviewFormProps {
    token: string;
}

export default function ReviewForm({ token }: ReviewFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        rating: 0, // Start with 0 for better star selection UX
        comment: '',
        image: ''
    });
    const [hoverRating, setHoverRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{text: string, type: 'success' | 'error' | 'info'} | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate rating was selected
        if (formData.rating < 1) {
            setMessage({ 
                text: "Please select a rating", 
                type: 'error' 
            });
            return;
        }
        
        setSubmitting(true);
        setMessage(null);
        
        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    token
                })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                if (result.review.status === 'approved') {
                    setMessage({ 
                        text: "Thank you for your review!", 
                        type: 'success' 
                    });
                    setFormData({
                        name: '',
                        rating: 0,
                        comment: '',
                        image: ''
                    });
                } else {
                    setMessage({ 
                        text: "Thank you for your review!", 
                        type: 'success' 
                    });
                }
            } else {
                setMessage({ 
                    text: result.message || "Failed to submit review", 
                    type: 'error' 
                });
            }
        } catch (error) {
            setMessage({ 
                text: "Failed to submit review", 
                type: 'error' 
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleStarClick = (rating: number) => {
        setFormData(prev => ({
            ...prev,
            rating
        }));
    };

    const handleStarHover = (rating: number) => {
        setHoverRating(rating);
    };

    const handleStarLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Share Your Experience</h2>
            
            {message && (
                <div className={`p-4 mb-6 rounded-lg ${
                    message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
                    message.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
                    'bg-blue-50 text-blue-800 border border-blue-200'
                }`}>
                    {message.text}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="Enter your name"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={`text-3xl ${(hoverRating || formData.rating) >= star ? 'text-orange-500' : 'text-gray-300'} transition-colors`}
                                onClick={() => handleStarClick(star)}
                                onMouseEnter={() => handleStarHover(star)}
                                onMouseLeave={handleStarLeave}
                            >
                                ★
                            </button>
                        ))}
                        <span className="ml-2 text-gray-600">
                            {formData.rating > 0 ? `${formData.rating} Star${formData.rating !== 1 ? 's' : ''}` : 'Select rating'}
                        </span>
                    </div>
                </div>
                
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="Share your thoughts about your experience..."
                    />
                </div>
                
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL (Optional)
                    </label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="https://example.com/photo.jpg"
                    />
                </div>
                
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${submitting ? 'bg-orange-400' : 'bg-orange-600 hover:bg-orange-700'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                    >
                        {submitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                            </span>
                        ) : 'Submit Review'}
                    </button>
                </div>
            </form>
        </div>
    );
}
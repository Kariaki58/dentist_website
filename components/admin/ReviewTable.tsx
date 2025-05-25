import Image from 'next/image';
import { ReviewWithActions } from '@/lib/types';
import { approveReview, rejectReview } from '@/lib/actions';
import connectToDatabase from '@/lib/mongoose';
import Review from '@/models/reviews';
import { toast } from 'sonner';


export async function getPendingReviews(): Promise<ReviewWithActions[]> {
    try {
        await connectToDatabase();
        const reviews = await Review.find({ status: 'pending' }).lean();
        return reviews.map(review => ({
            ...review,
            _id: review._id.toString(),
            createdAt: review.createdAt.toISOString(),
            updatedAt: review.updatedAt.toISOString()
        }));
    } catch (error) {
        throw new Error('Failed to fetch pending reviews');
    }
}

interface ReviewTableProps {
    reviews: ReviewWithActions[];
    showActions?: boolean;
}


export default function ReviewTable({ 
    reviews, 
    showActions = false 
}: ReviewTableProps) {
    const handleApprove = async (id: string) => {
        try {
            await approveReview(id);
            toast.success('Review approved successfully');
        } catch (error) {
            toast.error('Failed to approve review');
        }
    };

    const handleReject = async (id: string) => {
        try {
            await rejectReview(id);
            toast.success('Review rejected successfully');
        } catch (error) {
            toast.error('Failed to reject review');
        }
    };

    return (
        <div className="overflow-x-auto">
            <div className="min-w-full bg-white rounded-lg overflow-hidden">
                {/* Table for larger screens */}
                <table className="hidden md:table w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            {showActions && <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {reviews.map((review) => (
                            <tr key={review._id}>
                                <td className="py-4 px-4 whitespace-normal">{review.name}</td>
                                <td className="py-4 px-4">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <span 
                                                key={i} 
                                                className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-4 px-4 whitespace-normal max-w-xs">{review.comment}</td>
                                <td className="py-4 px-4">
                                    {review.image && (
                                        <Image
                                            src={review.image}
                                            alt={review.name}
                                            width={50}
                                            height={50}
                                            className="object-cover rounded"
                                        />
                                    )}
                                </td>
                                {showActions && (
                                    <td className="py-4 px-4 space-x-2">
                                        <button 
                                            onClick={() => handleApprove(review._id)}
                                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            onClick={() => handleReject(review._id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Cards for mobile screens */}
                <div className="md:hidden space-y-4 p-4">
                    {reviews.map((review) => (
                        <div key={review._id} className="border rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium">{review.name}</h3>
                                    <div className="flex mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <span 
                                                key={i} 
                                                className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {review.image && (
                                    <Image
                                        src={review.image}
                                        alt={review.name}
                                        width={40}
                                        height={40}
                                        className="object-cover rounded"
                                    />
                                )}
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                            {showActions && (
                                <div className="mt-3 flex space-x-2">
                                    <button 
                                        onClick={() => handleApprove(review._id)}
                                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        onClick={() => handleReject(review._id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
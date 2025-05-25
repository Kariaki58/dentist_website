import Review from '@/models/reviews';
import ReviewToken from '@/models/ReviewToken';
import connectToDatabase from './mongoose';

export async function getReviewStats() {
    await connectToDatabase();
    
    const [pendingReviews, approvedReviews, activeTokens] = await Promise.all([
        Review.countDocuments({ status: 'pending' }),
        Review.countDocuments({ status: 'approved' }),
        ReviewToken.countDocuments({ 
        isUsed: false,
        expiresAt: { $gt: new Date() }
        })
    ]);

    return {
        pendingReviews,
        approvedReviews,
        activeTokens
    };
}

export async function getPendingReviews() {
    await connectToDatabase();
    return Review.find({ status: 'pending' }).sort({ createdAt: -1 });
}

export async function getApprovedReviews() {
    await connectToDatabase();
    return Review.find({ status: 'approved' }).sort({ createdAt: -1 });
}
import { getApprovedReviews } from '@/lib/data';
import ReviewTable from '@/components/admin/ReviewTable';

export default async function ApprovedReviewsPage() {
    const reviews = await getApprovedReviews();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Approved Reviews</h1>
            {reviews.length === 0 ? (
                <p>No approved reviews</p>
            ) : (
                <ReviewTable 
                reviews={reviews} 
                showActions={false}
                />
            )}
        </div>
    );
}
import { getPendingReviews } from '@/lib/data';
import ReviewTable from '@/components/admin/ReviewTable';
import { approveReview, rejectReview } from '@/lib/actions';

export default async function PendingReviewsPage() {
    let reviews: any = []
    try {
        reviews = await getPendingReviews();
    } catch (error) {
        return <p className="text-red-500">Failed to load pending reviews</p>;
    }

    return (
        <div className='p-6'>
            <h1 className="text-2xl font-bold mb-6">Pending Reviews</h1>
            {reviews.length === 0 ? (
                <p>No pending reviews</p>
            ) : (
                <ReviewTable 
                    reviews={reviews} 
                    showActions={true}
                    approveAction={approveReview}
                    rejectAction={rejectReview}
                />
            )}
        </div>
    );
}
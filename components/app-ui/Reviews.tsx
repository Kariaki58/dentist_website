'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Minus } from "lucide-react";
import { usePathname } from "next/navigation";

interface IReview {
    _id: string;
    name: string;
    comment: string;
}

export default function Reviews() {
    const pathname = usePathname();
    const isReviewPage = pathname === "/reviews";

    const [reviews, setReviews] = useState<IReview[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const limit = isReviewPage ? 10 : 4;

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/reviews?limit=${limit}&page=${page}`);
                const data = await res.json();
                setReviews(data.reviews);
                setTotalPages(data.totalPages || 1);
            } catch (error) {
                setError('Failed to load reviews. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [limit, page]);

    if (error) {
        return (
            <div className="text-red-500 text-center">
                {error}
            </div>
        );
    }

    const getPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5; // Number of pages to show around current page

        // Always show first page
        items.push(1);

        // Add ellipsis if current page is far from start
        if (page > maxVisiblePages - 1) {
            items.push('...');
        }

        // Calculate start and end of visible pages
        let start = Math.max(2, page - Math.floor(maxVisiblePages / 2));
        let end = Math.min(totalPages - 1, page + Math.floor(maxVisiblePages / 2));

        // Adjust if we're near the beginning or end
        if (page <= maxVisiblePages - 1) {
            end = maxVisiblePages;
        } else if (page >= totalPages - Math.floor(maxVisiblePages / 2)) {
            start = totalPages - maxVisiblePages + 1;
        }

        // Add visible pages
        for (let i = start; i <= end; i++) {
            if (i > 1 && i < totalPages) {
                items.push(i);
            }
        }

        // Add ellipsis if current page is far from end
        if (page < totalPages - Math.floor(maxVisiblePages / 2)) {
            items.push('...');
        }

        // Always show last page if there's more than one page
        if (totalPages > 1) {
            items.push(totalPages);
        }

        return items;
    };

    return (
        <section className="space-y-5 max-w-screen-lg mx-auto my-20 px-5 lg:px-0">
            <div className="flex justify-center">
                <Button variant="outline" className="py-3 text-orange-500 hover:text-orange-600 cursor-auto">
                    Our Testimonial
                </Button>
            </div>
            <h1 className="text-center text-3xl font-bold">
                The <span className="text-orange-500">Honest Review</span> From Our Client
            </h1>
            <p className="px-5 lg:px-72 text-center text-gray-600">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit...
            </p>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {reviews.map((review) => (
                            <div key={review._id} className="bg-white shadow-md shadow-orange-100 p-5 rounded-lg space-y-3">
                                <p className="text-gray-700">{review.comment}</p>
                                <h3 className="font-bold flex gap-4">
                                    <Minus /> {review.name}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* Show "See More" button only on homepage */}
                    {!isReviewPage && (
                        <div className="flex justify-center">
                            <Link
                                href="/reviews"
                                className="p-5 text-white hover:text-white bg-orange-500 hover:bg-orange-800 rounded-md"
                            >
                                See More Reviews
                            </Link>
                        </div>
                    )}

                    {/* Enhanced Pagination only on /reviews */}
                    {isReviewPage && totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                            <button
                                onClick={() => setPage(1)}
                                disabled={page === 1}
                                className="px-3 py-1 rounded disabled:opacity-50 text-orange-500 hover:bg-orange-50"
                                aria-label="First page"
                            >
                                «
                            </button>
                            
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1 rounded disabled:opacity-50 text-orange-500 hover:bg-orange-50"
                                aria-label="Previous page"
                            >
                                ‹
                            </button>

                            {getPaginationItems().map((item, index) => (
                                item === '...' ? (
                                    <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
                                ) : (
                                    <button
                                        key={item}
                                        onClick={() => setPage(Number(item))}
                                        className={`px-3 py-1 rounded ${page === item ? 'bg-orange-500 text-white' : 'text-orange-500 hover:bg-orange-50'}`}
                                        aria-current={page === item ? 'page' : undefined}
                                    >
                                        {item}
                                    </button>
                                )
                            ))}

                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-3 py-1 rounded disabled:opacity-50 text-orange-500 hover:bg-orange-50"
                                aria-label="Next page"
                            >
                                ›
                            </button>
                            
                            <button
                                onClick={() => setPage(totalPages)}
                                disabled={page === totalPages}
                                className="px-3 py-1 rounded disabled:opacity-50 text-orange-500 hover:bg-orange-50"
                                aria-label="Last page"
                            >
                                »
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Minus } from "lucide-react";


interface IReview {
    id: number;
    name: string;
    content: string;
}

export default function Reviews() {
    const reviews: IReview[] = [
        {
            id: 1,
            name: "John Doe",
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
        },
        {
            id: 2,
            name: "Jane Smith",
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
        },
        {
            id: 3,
            name: "Mark Johnson",
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
        },
        {
            id: 4,
            name: "Sara Doe",
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
        }
    ]
    return (
        <section className="space-y-5 max-w-screen-lg mx-auto my-20 px-5 lg:px-0">
            <div className="flex justify-center">
                <Button variant="outline" className="py-3 text-orange-500 hover:text-orange-600 cursor-auto">Our Testimonial</Button>
            </div>
            <h1 className="text-center text-3xl font-bold">The <span className="text-orange-500">Honest Review</span> From Our Client</h1>
            <p className="px-5 lg:px-72 text-center text-gray-600">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. 
                Cum sociis natoque penatibus et magnis dis parturient.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white shadow-md shadow-orange-100 p-5 rounded-lg space-y-3">
                        <p className="text-gray-700">{review.content}</p>
                        <h3 className="font-bold flex gap-4"><Minus /> {review.name}</h3>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <Link href="/reviews" className="p-5 text-white hover:text-white bg-orange-500 hover:bg-orange-800 rounded-md">See More Reviews</Link>
            </div>
        </section>
    )
}
import { IReview } from "@/models/reviews";


export type ReviewWithActions = Omit<IReview, 'email' | 'tokenUsed' | 'status'> & {
    _id: string;
    createdAt: string;
    updatedAt: string;
};
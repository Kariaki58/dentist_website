import mongoose, { Document } from "mongoose";

export interface IReview extends Document {
    name: string;
    email: string;
    rating: number;
    comment: string;
    image?: string;
    status: 'approved' | 'pending' | 'rejected';
    tokenUsed: string;
    createdAt: Date;
    updatedAt: Date;
}

const ReviewSchema = new mongoose.Schema<IReview>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    status: {
        type: String,
        enum: ['approved', 'pending', 'rejected'],
        default: 'pending'
    },
    tokenUsed: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const Review = mongoose.models.Review as mongoose.Model<IReview> || 
            mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
import mongoose, { Document } from "mongoose";

export interface IReviewToken extends Document {
    token: string;
    email: string;
    expiresAt: Date;
    isUsed: boolean;
    createdAt: Date;
}

const ReviewTokenSchema = new mongoose.Schema<IReviewToken>({
    token: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    isUsed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const ReviewToken = mongoose.models.ReviewToken as mongoose.Model<IReviewToken> || 
                    mongoose.model<IReviewToken>("ReviewToken", ReviewTokenSchema);

export default ReviewToken;
import mongoose, { Document } from "mongoose";

export interface IService extends Document {
    name: string;
    description: string;
    price: number;
    duration: number;
    image: string;
}

const ServiceSchema = new mongoose.Schema<IService>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Service = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
import mongoose, { Document } from "mongoose";


export interface ICustomer extends Document {
    name: string | null;
    email: string | null;
    phone: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

const CustomerSchema = new mongoose.Schema<ICustomer>({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});


const Customer = mongoose.models.Customer || mongoose.model<ICustomer>("Customer", CustomerSchema);
export default Customer;
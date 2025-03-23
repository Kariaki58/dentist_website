import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    googleId: string;
    avatar: string;
    role: string;
}


const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

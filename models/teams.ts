import mongoose, { Document} from "mongoose";

export interface ITeam extends Document {
    name: string;
    role: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const TeamSchema = new mongoose.Schema<ITeam>({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});


const Team = mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);
export default Team;
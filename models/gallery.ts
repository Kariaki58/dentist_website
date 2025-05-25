import mongoose, { Document} from "mongoose";


export interface IGalleryImage extends Document {
    url: string;
    createdAt: Date;
    updatedAt: Date;
}

const GalleryImageSchema = new mongoose.Schema<IGalleryImage>({
    url: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});

const GalleryImage = mongoose.models.GalleryImage || mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);
export default GalleryImage;
import cloudinary from "@/lib/cloudinary";


export const deleteImage = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        throw new Error("Failed to delete image");
    }
};
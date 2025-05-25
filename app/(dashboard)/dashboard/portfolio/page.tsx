"use client";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface UploadedImage {
    _id: string;
    url: string;
    name: string;
}

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalImages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export default function ImageUpload() {
    const [images, setImages] = useState<File[]>([]);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationData>({
        currentPage: 1,
        totalPages: 1,
        totalImages: 0,
        hasNextPage: false,
        hasPrevPage: false
    });
    const [isLoading, setIsLoading] = useState(false);

    // Fetch images with pagination
    const fetchImages = async (page: number = 1) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/images/db?page=${page}`);
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.message || 'Failed to fetch images');
            
            setUploadedImages(data.images);
            setPagination(data.pagination);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch images');
        } finally {
            setIsLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchImages();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setSuccessMessage(null);
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        setError(null);
        setSuccessMessage(null);
        if (e.dataTransfer.files) {
            setImages(Array.from(e.dataTransfer.files));
        }
    };

    const handleUpload = async () => {
        if (images.length === 0) return;

        setIsUploading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const uploads = [];

            for (let i = 0; i < images.length; i++) {
                const formData = new FormData();
                formData.append('image', images[i]);
                
                const resImage = await fetch('/api/images/db', {
                    method: 'POST',
                    body: formData
                });

                if (!resImage.ok) {
                    const errorResponse = await resImage.json();
                    throw new Error(errorResponse.error || 'Failed to upload image');
                }

                const imageResponse = await resImage.json();
                uploads.push({
                    id: Date.now() + '-' + Math.random().toString(36).substring(2),
                    url: imageResponse.message,
                    name: images[i].name,
                });
            }

            setImages([]);
            setSuccessMessage(`Successfully uploaded ${uploads.length} ${uploads.length === 1 ? 'image' : 'images'}`);
            // Refresh the gallery after upload
            fetchImages(pagination.currentPage);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to upload images');
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = async (index: number) => {

        setImages(images.filter((_, i) => i !== index));
        setSuccessMessage('Image removed from selection');

    };

    const removeUploadedImage = async (id: string) => {
        try {
            // Optional: Add API call to delete from server
            const response = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Failed to remove image');
            }

            setUploadedImages(uploadedImages.filter(img => img._id !== id));
            setSuccessMessage('Image removed successfully');
            // Refresh pagination info
            fetchImages(pagination.currentPage);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to remove image');
        }
    };

    // Pagination controls with ellipsis
    const renderPagination = () => {
        const { currentPage, totalPages } = pagination;
        const pages = [];
        const maxVisiblePages = 5; // Adjust this number as needed

        // Always show first page
        pages.push(1);
        
        // Calculate range around current page
        let startPage = Math.max(2, currentPage - 2);
        let endPage = Math.min(totalPages - 1, currentPage + 2);

        // Adjust if we're at the start or end
        if (currentPage <= 3) {
            endPage = Math.min(1 + maxVisiblePages - 1, totalPages - 1);
        } else if (currentPage >= totalPages - 2) {
            startPage = Math.max(totalPages - maxVisiblePages + 1, 2);
        }

        // Add ellipsis after first page if needed
        if (startPage > 2) {
            pages.push('...');
        }

        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) {
            pages.push('...');
        }

        // Always show last page if there's more than one page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return (
            <div className="flex items-center justify-center gap-1 mt-6">
                <button
                    onClick={() => fetchImages(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage || isLoading}
                    className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
                >
                    <ChevronLeft size={35} />
                </button>

                {pages.map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' ? fetchImages(page) : null}
                        disabled={page === '...' || isLoading}
                        className={`px-3 py-1 rounded-md border ${page === pagination.currentPage ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-300'} disabled:opacity-50`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => fetchImages(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage || isLoading}
                    className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
                >
                    <ChevronRight size={35} />
                </button>
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Upload Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6">Upload Dental Work</h2>
                
                {/* Success/Error Messages */}
                {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                        {successMessage}
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}
                
                <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${isDragging ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-12 w-12 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        
                        <p className="text-gray-600">
                            {isDragging ? 'Drop images here' : 'Drag & drop images here, or click to browse'}
                        </p>
                        
                        <label className="cursor-pointer">
                            <span className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                                Select Images
                            </span>
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleFileChange}
                            />
                        </label>
                        
                        <p className="text-xs text-gray-400 mt-2">
                            JPEG, PNG (Max 10MB each)
                        </p>
                    </div>
                </div>
                
                {/* Selected Images Preview */}
                {images.length > 0 && (
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium text-black">
                                {images.length} {images.length === 1 ? 'image' : 'images'} selected
                            </h3>
                            <button 
                                onClick={() => setImages([])} 
                                className="text-sm text-gray-500 hover:text-black"
                            >
                                Clear all
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                                        <img 
                                            src={URL.createObjectURL(image)} 
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-black bg-opacity-60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <p className="text-xs text-gray-500 mt-1 truncate">{image.name}</p>
                                </div>
                            ))}
                        </div>
                        
                        <button
                            onClick={handleUpload}
                            disabled={isUploading}
                            className="mt-6 w-full py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 disabled:bg-orange-400 transition-colors flex items-center justify-center"
                        >
                            {isUploading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </>
                            ) : `Upload ${images.length} ${images.length === 1 ? 'image' : 'images'}`}
                        </button>
                    </div>
                )}
            </div>

            {/* Uploaded Images Gallery */}
            <div className="border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-black mb-6">Your Dental Work Gallery</h2>
                
                {isLoading ? (
                    <div className="text-center py-12">
                        <svg className="animate-spin mx-auto h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-2 text-gray-500">Loading images...</p>
                    </div>
                ) : uploadedImages.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No images uploaded yet</p>
                        <p className="text-sm text-gray-400 mt-2">Upload some images to see them here</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {uploadedImages.map((image) => (
                                <div key={image._id} className="relative group">
                                    <div className="aspect-square bg-gray-100 rounded-md overflow-hidden shadow-sm">
                                        <img 
                                            src={image.url} 
                                            alt={image.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeUploadedImage(image._id)}
                                        className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-1 rounded-full hover:bg-opacity-100 transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-4 text-sm text-gray-500">
                            Showing {uploadedImages.length} of {pagination.totalImages} {pagination.totalImages === 1 ? 'image' : 'images'} (Page {pagination.currentPage} of {pagination.totalPages})
                        </div>
                        
                        {pagination.totalPages > 1 && renderPagination()}
                    </>
                )}
            </div>
        </div>
    );
}
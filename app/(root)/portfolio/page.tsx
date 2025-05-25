// app/gallery/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryImage {
    _id: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { ref, inView } = useInView();

    const fetchImages = async () => {
        if (loading || !hasMore) return;
        
        setLoading(true);
        try {
        const res = await fetch(`/api/gallery?page=${page}&limit=12`);
        const data = await res.json();
        
        if (data.images.length === 0) {
            setHasMore(false);
        } else {
            setImages(prev => [...prev, ...data.images]);
            setPage(prev => prev + 1);
        }
        } catch (error) {
        setError('Failed to load images. Please try again later.');
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        if (inView) {
        fetchImages();
        }
    }, [inView]);

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    const handleImageClick = (image: GalleryImage) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const navigateImage = (direction: 'prev' | 'next') => {
        if (!selectedImage) return;
        
        const currentIndex = images.findIndex(img => img._id === selectedImage._id);
        if (currentIndex === -1) return;

        if (direction === 'prev' && currentIndex > 0) {
        setSelectedImage(images[currentIndex - 1]);
        } else if (direction === 'next' && currentIndex < images.length - 1) {
        setSelectedImage(images[currentIndex + 1]);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <div className="flex justify-between items-center mb-8">
            {/* Pinterest-style Masonry Grid */}
            <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((image) => (
                <div 
                key={image._id} 
                className="break-inside-avoid relative group cursor-pointer"
                onClick={() => handleImageClick(image)}
                >
                <Image
                    src={image.url}
                    alt="Dental procedure"
                    width={400}
                    height={600}
                    className="w-full h-auto rounded-lg shadow-md transition-transform group-hover:scale-105"
                    style={{ objectFit: 'cover' }}
                    unoptimized // Remove if you have optimized images
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-300" />
                </div>
            ))}
            </div>

            {/* Loading indicator */}
            {hasMore && (
            <div ref={ref} className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            )}

            {/* Full-screen Image Viewer */}
            {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
                >
                <X size={32} />
                </button>

                <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 text-white hover:text-gray-300 z-50 p-2"
                disabled={images.findIndex(img => img._id === selectedImage._id) === 0}
                >
                <ChevronLeft size={48} />
                </button>

                <div className="relative w-full h-full max-w-6xl flex items-center justify-center">
                <Image
                    src={selectedImage.url}
                    alt="Dental procedure"
                    fill
                    className="object-contain"
                    unoptimized // Remove if you have optimized images
                />
                </div>

                <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 text-white hover:text-gray-300 z-50 p-2"
                disabled={images.findIndex(img => img._id === selectedImage._id) === images.length - 1}
                >
                <ChevronRight size={48} />
                </button>
            </div>
            )}
        </div>
        </div>
    );
}
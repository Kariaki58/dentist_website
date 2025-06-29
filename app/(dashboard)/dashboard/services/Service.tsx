'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ServicesList from '@/components/app-ui/dashboard-services/services';

// Validation schema
const serviceSchema = z.object({
    serviceName: z.string().min(1, 'Service name is required').max(100),
    description: z.string().min(10, 'Description should be at least 10 characters').max(500),
    price: z.number().min(0, 'Price cannot be negative'),
    duration: z.number().min(5, 'Minimum duration is 5 minutes').max(240, 'Maximum duration is 4 hours'),
    image: z.union([
        z.instanceof(File).refine((file) => file.size <= 5000000, 'Max image size is 5MB'),
        z.string().url().optional()
    ])
});

type ServiceFormData = z.infer<typeof serviceSchema>;

export default function DashboardServicePage() {
    const searchParams = useSearchParams();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [currentServiceId, setCurrentServiceId] = useState<string | null>(null);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<ServiceFormData>({
        resolver: zodResolver(serviceSchema)
    });

    const fetchService = async (id: string) => {
        try {
            const response = await fetch(`/api/dashboard/services/${id}`);
            if (!response.ok) {
                const errorResponse = await response.json();
                setError(errorResponse.error || 'Failed to load service');
                return;
            }
            const data = await response.json();


            setValue('serviceName', data.message.name);
            setValue('description', data.message.description);
            setValue('price', data.message.price);
            setValue('duration', data.message.duration);
            setPreviewImage(data.message.image);
        } catch(error) {
            setError('Error fetching service data');
        }
    }

    useEffect(() => {
        const id = searchParams.get('edit');
        if (id) {
            setIsEdit(true);
            setCurrentServiceId(id);
            fetchService(id);
        } else {
            setIsEdit(false);
            setCurrentServiceId(null);
            // Reset form when not in edit mode
            reset();
            setPreviewImage(null);
        }
    }, [searchParams])

    

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue('image', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };



    const onSubmit = async (data: ServiceFormData) => {
        
        setIsSubmitting(true);
        setError(null);
        try {
            if (data.image instanceof File) {
                const formData = new FormData();
                formData.append('image', data.image);

                const resImage = await fetch('/api/images', {
                    method: 'POST',
                    body: formData
                });
                
                if (!resImage.ok) {
                    const errorResponse = await resImage.json();
                    setError(errorResponse.error || 'Failed to upload image');
                    return;
                }
                
                const imageResponse = await resImage.json();
                data.image = imageResponse.message;
            }

            // Determine the API endpoint and method based on edit mode
            const endpoint = isEdit && currentServiceId 
                ? `/api/dashboard/services/${currentServiceId}`
                : '/api/dashboard/services';
                
            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                setError(errorResponse.error || `Failed to ${isEdit ? 'update' : 'add'} service`);
                return;
            }

            setSubmitSuccess(true);
            const successMessage = isEdit 
                ? 'Service updated successfully!' 
                : 'Service added successfully!';
            
            // Reset form if not in edit mode
            if (!isEdit) {
                reset();
                setPreviewImage(null);
            }

            setTimeout(() => setSubmitSuccess(false), 3000);
        } catch (error) {
            setError(`Error ${isEdit ? 'updating' : 'adding'} service`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Add New Dental Service</h1>
                        <p className="text-gray-600 mt-2">Fill in the details of your service to add it to your offerings</p>
                    </div>

                    {submitSuccess && (
                        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
                            Service added successfully!
                        </div>
                    )}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Service Name */}
                            <div>
                                <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Service Name *
                                </label>
                                <input
                                    id="serviceName"
                                    type="text"
                                    {...register('serviceName')}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 ${errors.serviceName ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="e.g. Teeth Whitening"
                                />
                                {errors.serviceName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.serviceName.message}</p>
                                )}
                            </div>

                            {/* Price */}
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                    Price (NGN) *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                                    <input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    {...register('price', { valueAsNumber: true })}
                                    className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="0.00"
                                    />
                                </div>
                                {errors.price && (
                                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                                )}
                            </div>

                            {/* Duration */}
                            <div>
                                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration (minutes) *
                                </label>
                                <input
                                    id="duration"
                                    type="number"
                                    {...register('duration', { valueAsNumber: true })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="30"
                                />
                                {errors.duration && (
                                    <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                                )}
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                    Service Image
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="cursor-pointer">
                                    <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                        Choose File
                                    </span>
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    </label>
                                    {/* type error here. */}
                                    <span className="text-sm text-gray-500">
                                        {watch('image')?.name || 'No file chosen'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                {...register('description')}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Describe the service in detail..."
                            ></textarea>
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Image Preview */}
                        {previewImage && (
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Image Preview</h3>
                                <div className="w-40 h-40 border border-gray-200 rounded-lg overflow-hidden">
                                    <img src={previewImage} alt="Service preview" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-3 rounded-lg font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    isEdit ? 'Editing...' : 'Adding...'
                                    ) : (
                                    isEdit ? 'Update Service' : 'Add Service'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ServicesList />
        </>
    );
}
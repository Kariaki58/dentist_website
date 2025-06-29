import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Mock data type - replace with your actual service type
type DentalService = {
    _id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    image?: string;
};

// Mock data - replace with your actual data fetching

export default function ServicesList() {
    const [services, setServices] = useState<DentalService[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/dashboard/services', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.error || 'Failed to load services');
                    setLoading(false);
                    return;
                }
                const result = await response.json();
                setServices(result.message);
                setError(null);
            } catch (error) {
                setError('Failed to load services');
            } finally {
                setLoading(false);
            }
        };
        fetchServices();

    }, []);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        const response = await fetch(`/api/dashboard/services/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error || 'Failed to delete service');
            return;
        }
        const updatedServices = services.filter((service) => service._id !== id);
        setServices(updatedServices);
        setError(null);
        
        setDeleteConfirm(null);
    };
    

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 mb-4">Loading...</div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-500 mb-4">{error}</div>
            </div>
        );
    }

    if (services.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 mb-4">No services added yet</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Dental Services</h1>
                <p className="text-gray-600 mt-1 sm:mt-2">Manage your practice's services</p>
            </div>
        </div>

        {/* Desktop Table (lg breakpoint and up) */}
        <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                    <tr key={service._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                        {service.image && (
                            <div className="flex-shrink-0 h-10 w-10 mr-4">
                                <img className="h-10 w-10 rounded-full object-cover" src={service.image} alt={service.name} />
                            </div>
                        )}
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{service.name}</div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 line-clamp-2 max-w-xs">{service.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900 font-medium">₦{service.price.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-600">{service.duration} min</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                        <Link
                            href={`/dashboard/services/?edit=${service._id}`}
                            className="text-orange-500 hover:text-orange-600 p-2 rounded-full hover:bg-orange-50 transition-colors"
                            title="Edit"
                        >
                            <Pencil className="w-5 h-5"/>
                        </Link>
                        
                        {deleteConfirm === service._id ? (
                            <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleDelete(service._id)}
                                className="text-red-500 hover:text-red-600 p-1 text-sm font-medium"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="text-gray-500 hover:text-gray-600 p-1 text-sm font-medium"
                            >
                                Cancel
                            </button>
                            </div>
                        ) : (
                            <button
                            onClick={() => setDeleteConfirm(service._id)}
                            className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                            title="Delete"
                            >
                            <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        {/* Mobile Cards (below lg breakpoint) */}
        <div className="lg:hidden space-y-4">
            {services.length === 0 ? (
            <div className="text-center py-12">
                <div className="text-gray-400 mb-4">No services added yet</div>
            </div>
            ) : (
            services.map((service) => (
                <div key={service._id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                    {service.image && (
                        <div className="flex-shrink-0 h-12 w-12">
                        <img className="h-12 w-12 rounded-full object-cover" src={service.image} alt={service.name} />
                        </div>
                    )}
                    <div>
                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-500">₦{service.price.toFixed(2)} • {service.duration} min</p>
                    </div>
                    </div>
                    <div className="flex space-x-2">
                    <Link
                        href={`/dashboard/services/?edit=${service._id}`}
                        className="text-orange-500 hover:text-orange-600 p-1 rounded-full hover:bg-orange-50 transition-colors"
                        title="Edit"
                    >
                        <Pencil className="w-5 h-5" />
                    </Link>
                    {deleteConfirm === service._id ? (
                        <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-2">
                        <button
                            onClick={() => handleDelete(service._id)}
                            className="text-red-500 hover:text-red-600 text-xs font-medium"
                        >
                            Confirm
                        </button>
                        <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-gray-500 hover:text-gray-600 text-xs font-medium"
                        >
                            Cancel
                        </button>
                        </div>
                    ) : (
                        <button
                        onClick={() => setDeleteConfirm(service._id)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete"
                        >
                        <Trash2 className="w-5 h-5" />
                        </button>
                    )}
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                </div>
            ))
            )}
        </div>
        </div>
    );
}
'use client'

import { Trash, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

type Customer = {
    _id: string
    name: string
    phone: string
    email: string
    date: string
    bookings: number
}

const ITEMS_PER_PAGE = 10

export default function CustomerTable() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCustomers = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`/api/dashboard/customers?page=${currentPage}&limit=${ITEMS_PER_PAGE}`)
                const data = await response.json()
                
                if (response.ok) {
                    setCustomers(data.customers)
                    setTotalPages(data.pagination.totalPages)
                }
            } catch (error) {
                setError('Failed to load customers. Please try again later.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchCustomers()
    }, [currentPage])

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>
    }

    const deleteCustomer = async (id: string) => {
        if (!confirm('Are you sure you want to delete this customer?')) {
            return
        }
        
        try {
            const response = await fetch(`/api/dashboard/customers/${id}`, {
                method: 'DELETE'
            })
            
            if (response.ok) {
                setCustomers(prev => prev.filter(customer => customer._id !== id))
            } else {
                const data = await response.json()
                alert('Failed to delete customer')
            }
        } catch (error) {
            alert('Failed to delete customer')
        }
    }

    const goToPrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Customer Bookings</h2>
            
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left">Name</th>
                                    <th className="px-4 py-3 text-left">Phone</th>
                                    <th className="px-4 py-3 text-left">Email</th>
                                    <th className="px-4 py-3 text-left">Date</th>
                                    <th className="px-4 py-3 text-left">Bookings</th>
                                    <th className="px-4 py-3 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer, index) => (
                                    <tr
                                        key={customer._id}
                                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                    >
                                        <td className="px-4 py-3 whitespace-nowrap">{!customer.name ? 'N/A': `${customer.name}`}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{customer.phone}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{!customer.email ? 'N/A': `${customer.email}`}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{!customer.date ? 'N/A': `${customer.date}`}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{!customer.bookings ? 'N/A': `${customer.bookings}`}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => deleteCustomer(customer._id)}
                                                className="text-orange-500 hover:text-orange-600 transition"
                                                title="Delete"
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {customers.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-4 text-gray-400">
                                            No customers found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={goToPrevPage}
                            disabled={currentPage === 1 || isLoading}
                            className="flex items-center gap-1 text-sm px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                        >
                            <ChevronLeft size={16} />
                            Prev
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages || isLoading}
                            className="flex items-center gap-1 text-sm px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                        >
                            Next
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
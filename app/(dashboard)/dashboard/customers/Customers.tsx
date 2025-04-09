'use client'

import { Trash, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

type Customer = {
    id: number
    name: string
    phone: string
    email: string
    date: string
    bookings: number
}

// Simulate a large list of customers
const initialData: Customer[] = Array.from({ length: 53 }).map((_, i) => ({
    id: i + 1,
    name: `Customer ${i + 1}`,
    phone: `+12345678${i}`,
    email: `customer${i + 1}@example.com`,
    date: '2025-04-09',
    bookings: Math.floor(Math.random() * 10),
}))

const ITEMS_PER_PAGE = 10

export default function CustomerTable() {
    const [customers, setCustomers] = useState<Customer[]>(initialData)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const totalPages = Math.ceil(customers.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentCustomers = customers.slice(startIndex, endIndex)

    const deleteCustomer = (id: number) => {
        if (!confirm('Are you sure you want to delete this customer?')) {
            return
        }
        setCustomers(prev => prev.filter(customer => customer.id !== id))
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
                        {currentCustomers.map((customer, index) => (
                            <tr
                                key={customer.id}
                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                            >
                                <td className="px-4 py-3 whitespace-nowrap">{customer.name}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{customer.phone}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{customer.email}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{customer.date}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{customer.bookings}</td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => deleteCustomer(customer.id)}
                                        className="text-orange-500 hover:text-orange-600 transition"
                                        title="Delete"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {currentCustomers.length === 0 && (
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
                    disabled={currentPage === 1}
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
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 text-sm px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                    Next
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    )
}

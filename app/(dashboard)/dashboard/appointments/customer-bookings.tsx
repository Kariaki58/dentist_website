'use client'

import { Check, XCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

type Booking = {
    id: number
    name: string
    email: string
    services: string
    phone: string
    date: string
    arrival: string
}

const initialData: Booking[] = Array.from({ length: 32 }).map((_, i) => ({
    id: i + 1,
    name: `Client ${i + 1}`,
    email: `client${i + 1}@example.com`,
    phone: `+12345678${i}`,
    services: ['Cleaning', 'Checkup', 'Surgery'][i % 3],
    date: '2025-04-09',
    arrival: `${(i % 12) + 1}:00 ${i % 2 === 0 ? 'AM' : 'PM'}`,
}))

const ITEMS_PER_PAGE = 10

export default function BookingTable() {
    const [bookings, setBookings] = useState(initialData)
    const [currentPage, setCurrentPage] = useState(1)
    const [declineModal, setDeclineModal] = useState<{ open: boolean; bookingId: number | null }>({ open: false, bookingId: null })
    const [declineReason, setDeclineReason] = useState('')

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentBookings = bookings.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE)

    const handleAccept = (id: number) => {
        alert(`Booking ${id} accepted.`)
    }

    const handleDecline = () => {
        if (declineModal.bookingId !== null) {
            alert(`Booking ${declineModal.bookingId} declined for reason: ${declineReason}`)
            setDeclineReason('')
            setDeclineModal({ open: false, bookingId: null })
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Bookings</h2>
            <div className="overflow-x-auto shadow-md rounded-xl">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Phone</th>
                            <th className="px-4 py-3 text-left">Services</th>
                            <th className="px-4 py-3 text-left">Date</th>
                            <th className="px-4 py-3 text-left">Arrival</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBookings.map((booking, i) => (
                            <tr key={booking.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-3 whitespace-nowrap">{booking.name}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{booking.email}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{booking.phone}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{booking.services}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{booking.date}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{booking.arrival}</td>
                                <td className="px-4 py-3 whitespace-nowrap flex gap-3">
                                    <button
                                        title="Accept"
                                        onClick={() => handleAccept(booking.id)}
                                        className="text-green-600 hover:text-green-700"
                                    >
                                        <Check size={18} />
                                    </button>
                                    <button
                                        title="Decline"
                                        onClick={() => setDeclineModal({ open: true, bookingId: booking.id })}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <XCircle size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
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
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 text-sm px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                    Next
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Decline Reason Modal */}
            <Dialog open={declineModal.open} onOpenChange={(open) => setDeclineModal({ open, bookingId: declineModal.bookingId })}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Reason for Declining</DialogTitle>
                    </DialogHeader>
                    <Textarea
                        placeholder="Type your reason here..."
                        value={declineReason}
                        onChange={(e) => setDeclineReason(e.target.value)}
                        className="mt-2"
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={() => setDeclineModal({ open: false, bookingId: null })}>
                            Cancel
                        </Button>
                        <Button onClick={handleDecline} disabled={!declineReason.trim()}>
                            Submit
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

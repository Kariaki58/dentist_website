'use client'

import { Check, XCircle, ChevronLeft, ChevronRight, Loader2, RefreshCw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

type Booking = {
    _id: string
    name: string
    email: string
    service: {
        _id: string
        name: string
    }
    phone: string
    date: string
    time: string
    message?: string
    status: BookingStatus
    createdAt: string
    updatedAt: string
}

const ITEMS_PER_PAGE = 10

export default function BookingTable() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [declineModal, setDeclineModal] = useState<{ open: boolean; bookingId: string | null }>({ open: false, bookingId: null })
    const [declineReason, setDeclineReason] = useState('')
    const [processing, setProcessing] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Fetch bookings from API
    const fetchBookings = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/dashboard/appointments?page=${currentPage}&limit=${ITEMS_PER_PAGE}`)
            const data = await response.json()
            if (response.ok) {
                setBookings(data.bookings)
                setTotalPages(data.totalPages)
            } else {
                setError(data.error || 'Failed to fetch bookings')
            }
        } catch (error) {
            setError("Failed to fetch bookings")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBookings()
    }, [currentPage])

    const handleAccept = async (id: string) => {
        setProcessing(id)
        try {
            const response = await fetch(`/api/dashboard/appointments/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'confirmed'
                })
            })

            if (response.ok) {
                fetchBookings()
            } else {
                const data = await response.json()
                throw new Error(data.error || 'Failed to confirm booking')
            }
        } catch (error) {
            setError("something went wrong")
        } finally {
            setProcessing(null)
        }
    }

    const handleDecline = async () => {
        if (!declineModal.bookingId) return
        
        setProcessing(declineModal.bookingId)
        try {
            const response = await fetch(`/api/dashboard/appointments/${declineModal.bookingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'cancelled',
                    declineReason
                })
            })

            if (response.ok) {
                setDeclineReason('')
                setDeclineModal({ open: false, bookingId: null })
                fetchBookings()
            } else {
                const data = await response.json()
                throw new Error(data.error || 'Failed to decline booking')
            }
        } catch (error) {
            setError("something went wrong")
        } finally {
            setProcessing(null)
        }
    }

    const getStatusBadge = (status: BookingStatus) => {
        const variants = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
            completed: 'bg-blue-100 text-blue-800'
        }
        return (
            <Badge className={`${variants[status]} capitalize`}>
                {status}
            </Badge>
        )
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    if (error) {
        return (
            <div className="p-4">
                <div className="text-red-500 text-center">
                    {error}
                </div>
                <Button variant="outline" size="sm" onClick={fetchBookings}>
                    Retry
                </Button>
            </div>
        )
    }

    console.log({
        bookings
    })

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Bookings</h2>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={fetchBookings}
                    disabled={loading}
                >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                    Refresh
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto shadow-md rounded-xl">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left">Name</th>
                                    <th className="px-4 py-3 text-left">Email</th>
                                    <th className="px-4 py-3 text-left">Phone</th>
                                    <th className="px-4 py-3 text-left">Service</th>
                                    <th className="px-4 py-3 text-left">Date</th>
                                    <th className="px-4 py-3 text-left">Time</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                                            No bookings found
                                        </td>
                                    </tr>
                                ) : (
                                    bookings.map((booking) => (
                                        <tr key={booking._id} className="border-t border-gray-200 hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap">{booking.name}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{booking.email}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{booking.phone}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{booking.service.name}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{formatDate(booking.date)}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{booking.time}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                {getStatusBadge(booking.status)}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap flex gap-3">
                                                {/* {booking.status === 'pending' && ( */}
                                                    <>
                                                        <button
                                                            title="Accept"
                                                            onClick={() => handleAccept(booking._id)}
                                                            disabled={processing === booking._id}
                                                            className="text-green-600 hover:text-green-700 disabled:opacity-50"
                                                        >
                                                            {processing === booking._id ? (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                            ) : (
                                                                <Check size={18} />
                                                            )}
                                                        </button>
                                                        <button
                                                            title="Decline"
                                                            onClick={() => setDeclineModal({ open: true, bookingId: booking._id })}
                                                            disabled={processing === booking._id}
                                                            className="text-red-500 hover:text-red-600 disabled:opacity-50"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    </>
                                                {/* )} */}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {bookings.length > 0 && (
                        <div className="flex justify-between items-center mt-4">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1 || loading}
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Previous
                            </Button>
                            <span className="text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages || loading}
                            >
                                Next
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </>
            )}

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
                        <Button 
                            variant="outline" 
                            onClick={() => setDeclineModal({ open: false, bookingId: null })}
                            disabled={processing === declineModal.bookingId}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleDecline} 
                            disabled={!declineReason.trim() || processing === declineModal.bookingId}
                        >
                            {processing === declineModal.bookingId ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Submit
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
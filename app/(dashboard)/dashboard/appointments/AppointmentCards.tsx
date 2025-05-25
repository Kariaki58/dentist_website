import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CalendarCheck, CircleCheckBig, Clock, CopyX } from "lucide-react"
import BookingTable from "./customer-bookings"
import Appointment from "@/models/Appointment"
import connectToDatabase from "@/lib/mongoose"


export async function AppointmentCard() {
    let bookings = 0;
    let confirmedBookings = 0;
    let pendingBookings = 0;
    let cancelledBookings = 0;
    const error = null;


    try {
        await connectToDatabase();
    
        bookings = await Appointment.countDocuments();
        
        confirmedBookings = await Appointment.countDocuments({ status: 'confirmed' });
        
        pendingBookings = await Appointment.countDocuments({ status: 'pending' });
        
        cancelledBookings = await Appointment.countDocuments({ status: 'cancelled' });
    } catch(error) {
        error = "Failed to fetch appointment data.";
    }

    if (error) {
        return (
            <div className="text-red-500 text-center">
                {error}
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 lg:px-6">
                <Card className="@container/card">
                    <CardHeader className="relative">
                        <CardDescription className="flex gap-4 items-center">
                            <CalendarCheck className="text-blue-500" />
                            Total Bookings
                        </CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                            {bookings}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card">
                    <CardHeader className="relative">
                        <CardDescription className="flex gap-4 items-center">
                            <CircleCheckBig className="text-green-500" />
                            Confirmed Bookings
                        </CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                            {confirmedBookings}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card">
                    <CardHeader className="relative">
                        <CardDescription className="flex gap-4 items-center">
                            <Clock className="text-yellow-500" />
                            Pending Bookings
                        </CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                            {pendingBookings}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card">
                    <CardHeader className="relative">
                        <CardDescription className="flex gap-4 items-center">
                            <CopyX className="text-red-500" />
                            Cancelled Bookings
                        </CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                            {cancelledBookings}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
            <BookingTable />
        </>
    )
}

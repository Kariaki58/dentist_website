import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CalendarCheck, CircleCheckBig, Clock, CopyX } from "lucide-react"
import BookingTable from "./customer-bookings"


export function AppointmentCard() {
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
                            58
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
                            45
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
                            13
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
                            5
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
            <BookingTable />
        </>
    )
}

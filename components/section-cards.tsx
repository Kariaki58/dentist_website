import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Appointment from "@/models/Appointment"
import Customer from "@/models/customer"
import Service from "@/models/services"

export async function SectionCards() {
  let bookings = 0
  let customers = 0
  let services = 0
  let error = null

  try {
    bookings = await Appointment.countDocuments()
    customers = await Customer.countDocuments()
    services = await Service.countDocuments()
  } catch (err) {
    error = "Failed to fetch data."
  }
  if (error) {
    return (
      <div className="text-red-500 text-center">
        {error}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Estimated Revenue</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            $1,250.00
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {customers}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Bookings</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {bookings}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>All Services</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {services}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}

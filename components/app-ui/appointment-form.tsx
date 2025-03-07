export default function AppointmentForm() {
    return (
        <form className="grid grid-cols-2 gap-4 p-10 bg-white shadow-lg shadow-orange-100 rounded-lg">
            <div className="flex flex-col">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                <input type="text" id="name" name="name" placeholder="First name here" className="w-full p-4 border border-gray-300 mt-2 rounded-md" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Your Phone</label>
                <input type="text" id="phone" name="phone" placeholder="Telephone" className="w-full p-4 border border-gray-300 mt-2 rounded-md" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                <input type="email" id="email" name="email" placeholder="Add Email" className="w-full p-4 border border-gray-300 mt-2 rounded-md" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" id="date" name="date" className="w-full p-4 border border-gray-300 mt-2 rounded-md" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                <input type="time" id="time" name="time" className="w-full p-4 border border-gray-300 mt-2 rounded-md" />
            </div>

            <div className="flex flex-col col-span-2">
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">Select a Service</label>
                <select id="service" name="service" className="w-full p-4 border border-gray-300 mt-2 rounded-md">
                    <option>Service 1</option>
                    <option>Service 2</option>
                    <option>Service 3</option>
                </select>
            </div>

            <div className="flex flex-col col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Additional Notes</label>
                <textarea id="message" name="message" className="w-full p-4 border border-gray-300 mt-2 rounded-md min-h-[100px]" placeholder="Enter any additional details here..."></textarea>
            </div>

            <div className="col-span-2">
                <button type="submit" className="w-full bg-orange-500 p-3 text-white rounded-lg hover:bg-orange-600 transition-all duration-150">
                    Book Appointment
                </button>
            </div>
        </form>
    );
}

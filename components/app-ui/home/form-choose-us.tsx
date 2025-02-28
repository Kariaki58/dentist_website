import PhoneDialer from "./PhoneDialer";

export default function FormChooseUs() {
    return (
        <aside className="bg-white p-10 w-96 rounded-sm shadow-orange-500 shadow-sm">
            <h2 className="text-3xl font-bold mb-3">Don&apos;t Hesitate to Call Us</h2>
            <p className="mb-5 text-gray-700">
                Have questions or need assistance? Our team is here to help! 
                Reach out to us anytime, and we&apos;ll be happy to assist you.
            </p>
            <div className="space-y-5">
                <h3 className="flex justify-between">
                    <span className="font-bold">Monday - Friday</span>
                    <span className="text-gray-600">8AM - 10PM</span>
                </h3>
                <h3 className="flex justify-between">
                    <span className="font-bold">Satuday</span>
                    <span className="text-gray-600">8AM - 10PM</span>
                </h3>
                <h3 className="flex justify-between">
                    <span className="font-bold">Sunday</span>
                    <span className="text-gray-600">Closed</span>
                </h3>
            </div>
            <PhoneDialer />
        </aside>
    )
}
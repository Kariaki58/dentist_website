export default function PhoneDialer() {
    const handleCall = () => {
        window.location.href = `tel:+2349121402541`;
    };
    return (
        <button
            onClick={handleCall}
            className="p-4 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition w-full mt-10"
        >
            Call 09121402541
        </button>
    )
}
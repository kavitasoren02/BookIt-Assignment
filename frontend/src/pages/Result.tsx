import type React from "react"
import { useNavigate } from "react-router-dom"
import { useBooking } from "../context/BookingContext"
import { Header } from "../components/Header"

export const Result: React.FC = () => {
    const navigate = useNavigate()
    const { referenceId, clearBooking } = useBooking()

    const handleBackHome = () => {
        clearBooking()
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-4xl">✓</span>
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-dark mb-4">Booking Confirmed</h1>

                {referenceId && (
                    <p className="text-xl text-gray-600 mb-8">
                        Ref ID: <span className="font-bold">{referenceId}</span>
                    </p>
                )}

                <button
                    onClick={handleBackHome}
                    className="bg-light text-dark px-8 py-3 rounded-lg font-semibold hover:bg-border transition"
                >
                    Back to Home
                </button>
            </main>
        </div>
    )
}

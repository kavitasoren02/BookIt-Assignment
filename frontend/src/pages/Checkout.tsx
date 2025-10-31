import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useBooking } from "../context/BookingContext"
import { Header } from "../components/Header"
import arrow from '../assets/arrow.svg'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export const Checkout: React.FC = () => {
    const navigate = useNavigate()
    const { bookingData, setBookingData, setReferenceId } = useBooking()
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [promoCode, setPromoCode] = useState("")
    const [discount, setDiscount] = useState(0)
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (!bookingData) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="text-center py-12">No booking data. Please select an experience first.</div>
            </div>
        )
    }

    const handleApplyPromo = async () => {
        if (!promoCode) return

        try {
            const response = await axios.post(`${API_URL}/promo/validate`, {
                code: promoCode,
                amount: bookingData.subtotal,
            })

            setDiscount(response.data.discount)
            setError(null)
        } catch (err: any) {
            setError(err.response?.data?.error || "Invalid promo code")
            setDiscount(0)
        }
    }

    const handlePayment = async () => {
        if (!fullName || !email || !agreeTerms) {
            setError("Please fill all fields and agree to terms")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await axios.post(`${API_URL}/bookings`, {
                fullName,
                email,
                experienceId: bookingData.experienceId,
                date: bookingData.date,
                time: bookingData.time,
                quantity: bookingData.quantity,
                subtotal: bookingData.subtotal,
                taxes: bookingData.taxes,
                total: (bookingData?.total ?? 0) - discount,
                promoCode: promoCode || undefined,
                discount: discount || undefined,
            })

            setReferenceId(response.data.referenceId)
            navigate("/result")
        } catch (err: any) {
            setError(err.response?.data?.error || "Booking failed")
        } finally {
            setLoading(false)
        }
    }

    const finalTotal = (bookingData.total ?? 0) - discount

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-dark mb-6 hover:text-gray-600">
                    <img src={arrow} />
                    <span>Checkout</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-light p-6 rounded-lg mb-6">
                            <h2 className="text-xl font-bold text-dark mb-4">Your Details</h2>

                            <div className="flex gap-4 w-full">
                            <div className="mb-4 w-full">
                                <label className="block text-sm text-gray-600 mb-2">Full name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Your name"
                                    className="w-full px-4 py-2 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div className="mb-4 w-full">
                                <label className="block text-sm text-gray-600 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your name"
                                    className="w-full px-4 py-2 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-gray-600 mb-2">Promo code</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                        placeholder="Enter promo code"
                                        className="flex-1 px-4 py-2 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <button
                                        onClick={handleApplyPromo}
                                        className="bg-dark text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    className="w-4 h-4 accent-primary"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600">
                                    I agree to the terms and safety policy
                                </label>
                            </div>

                            {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-light p-6 rounded-lg sticky top-4">
                            <h2 className="text-lg font-bold text-dark mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-6 pb-6 border-b border-border">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Experience</span>
                                    <span className="text-dark font-semibold">{bookingData.experienceName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Date</span>
                                    <span className="text-dark font-semibold">{bookingData.date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Time</span>
                                    <span className="text-dark font-semibold">{bookingData.time}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Qty</span>
                                    <span className="text-dark font-semibold">{bookingData.quantity}</span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-dark font-semibold">₹{bookingData.subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Taxes</span>
                                    <span className="text-dark font-semibold">₹{bookingData.taxes}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>-₹{discount}</span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-border pt-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-dark font-bold">Total</span>
                                    <span className="text-dark font-bold text-lg">₹{finalTotal}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={loading}
                                className="w-full bg-primary text-dark py-3 rounded-lg font-bold hover:bg-yellow-400 transition disabled:opacity-50"
                            >
                                {loading ? "Processing..." : "Pay and Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

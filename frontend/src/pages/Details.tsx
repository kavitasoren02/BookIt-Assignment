import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import type { Experience } from "../types"
import { useBooking } from "../context/BookingContext"
import { Header } from "../components/Header"
import arrow from '../assets/arrow.svg'
import { formatShortDate } from "../utils/utils"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export const Details: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { setBookingData } = useBooking()
    const [experience, setExperience] = useState<Experience | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [selectedTime, setSelectedTime] = useState<string>("")
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await axios.get(`${API_URL}/experiences/${id}`)
                setExperience(response.data)
                if (response.data.dates.length > 0) {
                    setSelectedDate(response.data.dates[0])
                }
            } catch (error) {
                console.error("Failed to load experience", error)
            } finally {
                setLoading(false)
            }
        }

        fetchExperience()
    }, [id])

    const handleConfirm = () => {
        if (!experience || !selectedDate || !selectedTime) {
            alert("Please select date and time")
            return
        }

        const subtotal = experience.price * quantity
        const taxes = Math.round(subtotal * 0.06)
        const total = subtotal + taxes

        setBookingData({
            experienceId: experience._id,
            experienceName: experience.name,
            date: selectedDate,
            time: selectedTime,
            quantity,
            subtotal,
            taxes,
            total,
        })

        navigate("/checkout")
    }

    if (loading) return <div className="text-center py-12">Loading...</div>
    if (!experience) return <div className="text-center py-12">Experience not found</div>

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button onClick={() => navigate("/")} className="flex items-center gap-2 text-dark mb-6 hover:text-gray-600">
                    <img src={arrow} />
                    <span>Details</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <img
                            src={experience.image || "/placeholder.svg"}
                            alt={experience.name}
                            className="w-full h-96 object-cover rounded-lg mb-6"
                        />

                        <h1 className="text-3xl font-bold text-dark mb-4">{experience.name}</h1>
                        <p className="text-gray-600 mb-6">{experience.description}</p>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-dark mb-4">Choose date</h2>
                            <div className="flex gap-2 flex-wrap">
                                {experience.dates.map((date) => (
                                    <button
                                        key={date}
                                        onClick={() => setSelectedDate(date)}
                                        className={`px-4 py-2 rounded font-semibold transition ${selectedDate === date ? "bg-primary text-dark" : "bg-light text-dark hover:bg-border"
                                            }`}
                                    >
                                        {formatShortDate(date)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-dark mb-4">Choose time</h2>
                            <div className="flex gap-2 flex-wrap">
                                {experience.slots.map((slot) => (
                                    <button
                                        key={slot.time}
                                        onClick={() => setSelectedTime(slot.time)}
                                        disabled={slot.available === 0}
                                        className={`px-4 py-2 rounded font-semibold transition ${selectedTime === slot.time
                                                ? "bg-primary text-dark"
                                                : slot.available === 0
                                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    : "bg-light text-dark hover:bg-border"
                                            }`}
                                    >
                                        {slot.time}
                                        {slot.available === 0 && <span className="text-xs ml-1">Sold out</span>}
                                        {slot.available > 0 && <span className="text-xs ml-1 text-red-500">{slot.available} left</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 rounded-lg">
                            <h3 className="font-bold text-dark mb-2">About</h3>
                            <p className="text-sm bg-light p-4 text-gray-600">{experience.description}</p>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-light p-6 rounded-lg sticky top-4">
                            <div className="flex items-center justify-between">
                                <p className="text-gray-600 mb-2">Starts at</p>
                                <p className="text-2xl font-bold text-dark mb-6">₹{experience.price}</p>
                            </div>
                            <div className="mb-2 flex justify-between items-center">
                                <p className="text-gray-600 mb-2">Quantity</p>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="text-dark font-bold text-lg hover:text-gray-600"
                                    >
                                        −
                                    </button>
                                    <span className="text-dark font-bold">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="text-dark font-bold text-lg hover:text-gray-600"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6 flex flex-col gap-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-dark font-bold">₹{experience.price * quantity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Taxes</span>
                                    <span className="text-dark font-bold">₹{Math.round(experience.price * quantity * 0.06)}</span>
                                </div>
                                <div className="flex justify-between border-t border-border pt-4">
                                    <span className="text-dark font-bold">Total</span>
                                    <span className="text-dark font-bold text-lg">
                                        ₹{experience.price * quantity + Math.round(experience.price * quantity * 0.06)}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirm}
                                className="w-full bg-primary text-dark py-3 rounded-lg font-bold hover:bg-yellow-400 transition"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

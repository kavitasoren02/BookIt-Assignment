import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import type { Experience } from "../types"
import { Header } from "../components/Header"
import { useBooking } from "../context/BookingContext"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export const Home: React.FC = () => {
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { searchTerm } = useBooking()
    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await axios.get(`${API_URL}/experiences?search=${searchTerm}`)
                setExperiences(response.data)
            } catch (err) {
                setError("Failed to load experiences")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if(timerId.current) clearTimeout(timerId.current)
        timerId.current = setTimeout(fetchExperiences, 300)

        return () => {
            if(timerId.current) clearTimeout(timerId.current)
        }
    }, [searchTerm])

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading && <div className="text-center py-12 text-dark">Loading experiences...</div>}

                {error && <div className="text-center py-12 text-red-600">{error}</div>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {experiences.map((experience) => (
                            <div
                                key={experience._id}
                                className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
                            >
                                <img
                                    src={experience.image || "/placeholder.svg"}
                                    alt={experience.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-bold text-dark text-lg">{experience.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{experience.location}</p>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{experience.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-dark flex items-center gap-1">From <span className="text-2xl">₹{experience.price}</span></span>
                                        <Link
                                            to={`/details/${experience._id}`}
                                            className="bg-primary text-dark px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition text-sm"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && experiences.length <= 0 && (
                    <div className="w-full h-full">
                        <h1 className="text-9xl font-bold text-primary text-center">404</h1>
                        <p className="text-xl font-semibold text-dark text-center">Experiences not Found...</p>
                    </div>
                )}
            </main>
        </div>
    )
}

import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { useBooking } from "../context/BookingContext"


export const Header: React.FC = () => {
    const { searchTerm, setSearchTerm } = useBooking()
    const location= useLocation();

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/HDlogo.png" alt="Logo" />
                </Link>
                {location.pathname === "/" && <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search experiences"
                        className="hidden md:block px-4 py-2 bg-light border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-sm"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <button 
                        className="bg-primary text-dark px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
                        // onClick={onClickSearch}
                    >
                        Search
                    </button>
                </div>}
            </div>
        </header>
    )
}

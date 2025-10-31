import type React from "react"
import { createContext, useContext, useState, type SetStateAction } from "react"
import type { BookingData } from "../types"

interface BookingContextType {
    bookingData: Partial<BookingData> | null
    setBookingData: (data: Partial<BookingData>) => void
    referenceId: string | null
    setReferenceId: (id: string) => void
    clearBooking: () => void
    searchTerm: string, 
    setSearchTerm: React.Dispatch<SetStateAction<string>>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bookingData, setBookingData] = useState<Partial<BookingData> | null>(null)
    const [referenceId, setReferenceId] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>("")

    const clearBooking = () => {
        setBookingData(null)
        setReferenceId(null)
    }

    return (
        <BookingContext.Provider value={{ bookingData, setBookingData, referenceId, setReferenceId, clearBooking, searchTerm, setSearchTerm }}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBooking = () => {
    const context = useContext(BookingContext)
    if (!context) {
        throw new Error("useBooking must be used within BookingProvider")
    }
    return context
}

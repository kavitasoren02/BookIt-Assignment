import mongoose, { Schema, type Document } from "mongoose"

export interface IBooking extends Document {
    fullName: string
    email: string
    experienceId: string
    experienceName: string
    date: string
    time: string
    quantity: number
    subtotal: number
    taxes: number
    total: number
    promoCode?: string
    discount?: number
    referenceId: string
    createdAt: Date
}

const bookingSchema = new Schema<IBooking>({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    experienceId: { type: String, required: true },
    experienceName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    taxes: { type: Number, required: true },
    total: { type: Number, required: true },
    promoCode: { type: String },
    discount: { type: Number },
    referenceId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<IBooking>("Booking", bookingSchema)

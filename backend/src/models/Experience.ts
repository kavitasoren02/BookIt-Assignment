import mongoose, { Schema, type Document } from "mongoose"

export interface ISlot {
    time: string
    available: number
}

export interface IExperience extends Document {
    name: string
    location: string
    description: string
    image: string
    price: number
    dates: string[]
    slots: ISlot[]
    createdAt: Date
}

const slotSchema = new Schema<ISlot>({
    time: { type: String, required: true },
    available: { type: Number, required: true },
})

const experienceSchema = new Schema<IExperience>({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    dates: [{ type: String, required: true }],
    slots: [slotSchema],
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<IExperience>("Experience", experienceSchema)

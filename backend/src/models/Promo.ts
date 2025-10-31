import mongoose, { Schema, type Document } from "mongoose"

export interface IPromo extends Document {
    code: string
    discountType: "percentage" | "flat"
    discountValue: number
    maxUses: number
    currentUses: number
    active: boolean
}

const promoSchema = new Schema<IPromo>({
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ["percentage", "flat"], required: true },
    discountValue: { type: Number, required: true },
    maxUses: { type: Number, required: true },
    currentUses: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
})

export default mongoose.model<IPromo>("Promo", promoSchema)

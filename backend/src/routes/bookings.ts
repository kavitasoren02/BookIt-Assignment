import express, { type Request, type Response } from "express"
import Booking from "../models/Booking"
import Experience from "../models/Experience"

const router = express.Router()

// Generate reference ID
const generateReferenceId = (): string => {
    return (
        Math.random().toString(36).substring(2, 8).toUpperCase() + Math.random().toString(36).substring(2, 4).toUpperCase()
    )
}

// POST create booking
router.post("/", async (req: Request, res: Response) => {
    try {
        const { fullName, email, experienceId, date, time, quantity, subtotal, taxes, total, promoCode, discount } =
            req.body

        // Validate required fields
        if (!fullName || !email || !experienceId || !date || !time || !quantity) {
            return res.status(400).json({ error: "Missing required fields" })
        }

        // Check if experience exists
        const experience = await Experience.findById(experienceId)
        if (!experience) {
            return res.status(404).json({ error: "Experience not found" })
        }

        // Check slot availability
        const slot = experience.slots.find((s) => s.time === time)
        if (!slot || slot.available < quantity) {
            return res.status(400).json({ error: "Slot not available" })
        }

        // Create booking
        const referenceId = generateReferenceId()
        const booking = new Booking({
            fullName,
            email,
            experienceId,
            experienceName: experience.name,
            date,
            time,
            quantity,
            subtotal,
            taxes,
            total,
            promoCode,
            discount,
            referenceId,
        })

        // Update slot availability
        slot.available -= quantity
        await experience.save()

        // Save booking
        await booking.save()

        res.status(201).json({
            success: true,
            referenceId,
            booking,
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to create booking" })
    }
})

export default router

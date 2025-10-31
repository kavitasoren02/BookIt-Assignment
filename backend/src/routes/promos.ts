import express, { type Request, type Response } from "express"
import Promo from "../models/Promo"

const router = express.Router()

// POST validate promo code
router.post("/validate", async (req: Request, res: Response) => {
    try {
        const { code, amount } = req.body

        if (!code) {
            return res.status(400).json({ error: "Promo code required" })
        }

        const promo = await Promo.findOne({ code: code.toUpperCase(), active: true })

        if (!promo) {
            return res.status(404).json({ error: "Invalid promo code" })
        }

        if (promo.currentUses >= promo.maxUses) {
            return res.status(400).json({ error: "Promo code limit exceeded" })
        }

        let discount = 0
        if (promo.discountType === "percentage") {
            discount = (amount * promo.discountValue) / 100
        } else {
            discount = promo.discountValue
        }

        res.json({
            valid: true,
            discount,
            discountType: promo.discountType,
            discountValue: promo.discountValue,
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to validate promo code" })
    }
})

export default router

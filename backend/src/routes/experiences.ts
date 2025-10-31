import express, { type Request, type Response } from "express"
import Experience from "../models/Experience"

const router = express.Router()

// GET all experiences
router.get("/", async (req: Request, res: Response) => {
    try {
        const { search } = req.query
        
        const query = search
            ? {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                    { location: { $regex: search, $options: "i" } },
                ],
            }
            : {}

        const experiences = await Experience.find(query)
        res.json(experiences)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch experiences" })
    }
})


// GET experience by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const experience = await Experience.findById(req.params.id)
        if (!experience) {
            return res.status(404).json({ error: "Experience not found" })
        }
        res.json(experience)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch experience" })
    }
})

export default router

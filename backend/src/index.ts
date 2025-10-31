import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import experienceRoutes from "./routes/experiences"
import bookingRoutes from "./routes/bookings"
import promoRoutes from "./routes/promos"
import { ConnectToMongo } from "./config/connectToMongo"
import { seedData } from "./config/seedData"

dotenv.config()
ConnectToMongo()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/experiences", experienceRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/promo", promoRoutes)

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK" })
})

app.listen(PORT, async() => {
    await seedData()
    console.log(`Server running on port ${PORT}`)
})

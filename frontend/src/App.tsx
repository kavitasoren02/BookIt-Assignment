import type React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { BookingProvider } from "./context/BookingContext"
import { Home } from "./pages/Home"
import { Details } from "./pages/Details"
import { Checkout } from "./pages/Checkout"
import { Result } from "./pages/Result"

const App: React.FC = () => {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </BookingProvider>
  )
}

export default App

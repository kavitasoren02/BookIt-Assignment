export interface Experience {
  _id: string
  name: string
  location: string
  description: string
  image: string
  price: number
  dates: string[]
  slots: Slot[]
}

export interface Slot {
  time: string
  available: number
}

export interface BookingData {
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
}

export interface BookingResponse {
  success: boolean
  referenceId: string
  booking: BookingData
}

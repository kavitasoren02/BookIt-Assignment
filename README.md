# BookIt Backend

Express.js + MongoDB + TypeScript backend for the BookIt experiences booking platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with MongoDB URI and PORT

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience details
- `POST /api/bookings` - Create a booking
- `POST /api/promo/validate` - Validate promo code
- `GET /api/health` - Health check


# BookIt Frontend

React + Vite + TypeScript + Tailwind CSS frontend for the BookIt experiences booking platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with API URL

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Features

- Browse experiences
- View experience details with date/time selection
- Checkout with promo code support
- Booking confirmation
- Responsive design with Tailwind CSS
- State management with Context API
- TypeScript for type safety

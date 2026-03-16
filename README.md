# FOODZILA MERN

Multi-role food ordering platform built with a React + Vite frontend and an Express + MongoDB backend.

## App Architecture

![Food App Architecture](docs/FoodArchitect.png)

## What This Project Includes

- Customer flow: browse restaurants, add items to cart, place COD or Stripe orders.
- Vendor flow: register/login, wait for admin approval, manage products, track vendor orders.
- Admin flow: approve/reject vendors, manage users, monitor all orders.
- Rider flow: dedicated login/signup and dashboard routes in frontend.
- Reviews: customers can review both products and restaurants.
- Image uploads: product image uploads via Cloudinary.

## Tech Stack

- Frontend: React 19, Vite, React Router, Tailwind CSS, Axios, Recharts, MUI, Ant Design
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, Joi, bcrypt
- Payments and media: Stripe, Cloudinary, Multer

## Monorepo Structure

- `src/` -> React frontend
- `server/` -> Express API + MongoDB models/routes
- `docs/` -> architecture image/assets

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB (local or Atlas)
- Stripe account (for checkout flow)
- Cloudinary account (for image upload)

## Setup

1. Install frontend dependencies (project root):

```bash
npm install
```

2. Install backend dependencies:

```bash
cd server
npm install
cd ..
```

3. Create backend environment file:

```bash
copy server\\.env.example server\\.env
```

4. Update `server/.env` values (see env section below).

5. Start both frontend and backend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000`.

## Environment Variables

The backend loads variables from `server/.env`.

Required:

- `MONGO_URI` -> MongoDB connection string
- `JWT_SECRET` -> JWT signing secret
- `PORT` -> backend port (default `5000`)
- `CLIENT_URL` -> frontend URL for Stripe redirects
- `STRIPE_SECRET_KEY` -> Stripe secret key

Optional (recommended):

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Optional (admin bootstrap):

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_NAME`
- `ADMIN_PHONE`

If `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set, a default admin account is ensured on server startup.

## Scripts

Root scripts:

- `npm run client` -> start Vite frontend
- `npm run server` -> start backend with Node
- `npm run dev` -> run frontend + backend concurrently
- `npm run build` -> production frontend build
- `npm run lint` -> run ESLint
- `npm run preview` -> preview production frontend build

Server scripts (inside `server/`):

- `npm run start` -> start backend
- `npm run dev` -> start backend with nodemon

## Authentication and Roles

- Roles: `customer`, `vendor`, `rider`, `admin`
- Auth uses Bearer JWT (`Authorization: Bearer <token>`)
- Vendor accounts are created with `pending` approval by default
- Admin must approve vendor before vendor can login successfully

## API Overview

Base URL in development: `/api` (proxied by Vite to `http://localhost:5000`)

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`

Products:

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (vendor only, supports image upload)
- `PUT /api/products/:id` (owner vendor)
- `DELETE /api/products/:id` (owner vendor)
- `POST /api/products/:id/reviews` (authenticated)

Restaurants:

- `GET /api/restaurants`
- `GET /api/restaurants/:id`
- `GET /api/restaurants/:id/products`
- `POST /api/restaurants/:id/reviews` (authenticated)

Orders:

- `POST /api/orders` (customer, COD)
- `POST /api/orders/create-checkout-session` (customer, Stripe)
- `POST /api/orders/confirm-payment` (customer)
- `POST /api/orders/cancel-payment` (customer)
- `GET /api/orders/vendor` (vendor)
- `PATCH /api/orders/:id/status` (vendor)

Admin:

- `GET /api/admin/vendors/pending`
- `PATCH /api/admin/vendors/:id/approve`
- `PATCH /api/admin/vendors/:id/reject`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id/toggle-status`
- `DELETE /api/admin/users/:id`
- `GET /api/admin/orders`

## Main Frontend Routes

- `/Main` -> role selection landing
- `/` -> customer home
- `/restaurant/:id` -> restaurant details + menu
- `/cart`, `/order` -> cart and order placement
- `/payment-success`, `/payment-cancel` -> Stripe callbacks
- `/AdminPage`, `/VendorPage`, `/RiderPage` -> role dashboards (protected)

## Notes

- Frontend API requests use relative `/api` paths and rely on Vite proxy config.
- For production deployment, configure CORS and API base URLs appropriately.
- Keep secrets only in `server/.env`; never commit real credentials.

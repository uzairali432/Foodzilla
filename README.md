## App Architecture

![Food App Architecture](docs/FoodArchitect.png)

## MERN Backend

This project now includes a Node/Express backend using MongoDB, JWT authentication, and Joi validation. The server lives in the `server/` directory.

### Getting started

1. Copy `.env.example` to `.env` inside `server/` and fill in your MongoDB URI and JWT secret.
2. Install dependencies in both client and server:
   ```sh
   cd server && npm install
   cd .. && npm install
   ```
3. Start both services concurrently:
   ```sh
   npm run dev
   ```
   *The `dev` script uses `concurrently` to run the server and the Vite client.*

4. API endpoints are prefixed with `/api` and proxying is configured in `vite.config.js` (you can override the base URL with `VITE_API_URL` in a `.env` file if needed).

Feel free to extend the backend with additional routes and models as needed.

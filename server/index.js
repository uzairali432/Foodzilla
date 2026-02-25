import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';
import restaurantRoutes from './routes/restaurants.js';

// explicitly load environment variables from the server directory
const envPath = path.resolve(process.cwd(), 'server', '.env');
dotenv.config({ path: envPath });

const app = express();
app.use(cors());
app.use(express.json());

// mount routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/restaurants', restaurantRoutes);

// health check
app.get('/', (req, res) => {
  res.send('Foodzila API is running');
});

const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI not defined. Make sure server/.env is set and readable.');
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
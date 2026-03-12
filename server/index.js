import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import bcrypt from 'bcrypt';

import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';
import restaurantRoutes from './routes/restaurants.js';
import adminRoutes from './routes/admin.js';
import User from './models/User.js';

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
app.use('/api/admin', adminRoutes);

// health check
app.get('/', (req, res) => {
  res.send('Foodzila API is running');
});

// JSON error handler – must be after all routes
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

const ensureDefaultAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return;

  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    if (existing.role !== 'admin') {
      existing.role = 'admin';
      existing.isActive = true;
      existing.approvalStatus = 'approved';
      await existing.save();
    }
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  await User.create({
    email: adminEmail,
    password: hashedPassword,
    role: 'admin',
    name: process.env.ADMIN_NAME || 'Admin',
    phoneNumber: process.env.ADMIN_PHONE || '+10000000000',
    isActive: true,
    approvalStatus: 'approved',
  });
  console.log('Default admin account ensured from environment variables.');
};

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
    ensureDefaultAdmin()
      .then(() => {
        const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        server.on('error', (err) => {
          if (err.code === 'EADDRINUSE') {
            console.error(`Port ${PORT} is already in use. Stop the existing server process and try again.`);
            return;
          }
          console.error('Server startup error:', err);
        });
      })
      .catch((err) => {
        console.error('Failed to ensure default admin account:', err);
        const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        server.on('error', (listenErr) => {
          if (listenErr.code === 'EADDRINUSE') {
            console.error(`Port ${PORT} is already in use. Stop the existing server process and try again.`);
            return;
          }
          console.error('Server startup error:', listenErr);
        });
      });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
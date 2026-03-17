import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

import User from '../models/User.js';

const router = express.Router();

// validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('customer', 'vendor', 'rider', 'admin').required(),
  name: Joi.string().min(2).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required(),
  vehicleType: Joi.string()
    .valid('Car', 'Bike', 'Truck', 'Bus', 'Van')
    .insensitive()
    .when('role', {
      is: 'rider',
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
  licenseNumber: Joi.string()
    .pattern(/^[A-Za-z0-9\-\s]{5,20}$/)
    .when('role', {
      is: 'rider',
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
  // vendor users can provide restaurant details
  restaurantName: Joi.string().min(2).max(50).when('role', {
    is: 'vendor',
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),
  restaurantAddress: Joi.string()
    .min(5)
    .max(100)
    .when('role', { is: 'vendor', then: Joi.optional(), otherwise: Joi.forbidden() }),
  businessName: Joi.string().min(2).max(50).when('role', {
    is: 'vendor',
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),
  address: Joi.string().min(5).max(100).when('role', {
    is: 'vendor',
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  expectedRole: Joi.string().valid('customer', 'vendor', 'rider', 'admin').optional(),
});

// register route
router.post('/register', async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      email,
      password,
      role,
      name,
      phoneNumber,
      vehicleType,
      licenseNumber,
      restaurantName,
      restaurantAddress,
      businessName,
      address,
    } = value;
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const userData = { email: normalizedEmail, password: hashed, role, name, phoneNumber };
    if (role === 'vendor') {
      userData.approvalStatus = 'pending';
    }
    if (role === 'rider') {
      userData.vehicleType = vehicleType;
      userData.licenseNumber = licenseNumber;
    }
    if (role === 'vendor') {
      userData.restaurantName = restaurantName || businessName;
      userData.restaurantAddress = restaurantAddress || address;
    }
    const user = new User(userData);
    await user.save();

    if (role === 'vendor') {
      return res.status(201).json({
        message: 'Vendor registered. Wait for admin approval before login.',
        user: {
          email: user.email,
          role: user.role,
          name: user.name,
          phoneNumber: user.phoneNumber,
          ...(user.vehicleType && { vehicleType: user.vehicleType }),
          ...(user.licenseNumber && { licenseNumber: user.licenseNumber }),
          approvalStatus: user.approvalStatus,
        },
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        email: user.email,
        role: user.role,
        name: user.name,
        phoneNumber: user.phoneNumber,
        ...(user.vehicleType && { vehicleType: user.vehicleType }),
        ...(user.licenseNumber && { licenseNumber: user.licenseNumber }),
        ...(user.restaurantName && { restaurantName: user.restaurantName }),
        ...(user.restaurantAddress && { restaurantAddress: user.restaurantAddress }),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// login route
router.post('/login', async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password, expectedRole } = value;
    const normalizedEmail = email.trim().toLowerCase();

    if (expectedRole === 'admin') {
      const configuredAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
      if (!configuredAdminEmail) {
        return res.status(500).json({ message: 'Admin login is not configured' });
      }
      if (normalizedEmail !== configuredAdminEmail) {
        return res.status(403).json({ message: 'Only authorized admin credentials are allowed' });
      }
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // One-time migration: convert legacy seller accounts to admin.
    if (user.role === 'seller') {
      user.role = 'admin';
      await user.save();
    }

    if (user.role === 'vendor' && user.approvalStatus !== 'approved') {
      return res.status(403).json({
        message: 'Vendor account is pending approval by admin',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is inactive' });
    }

    if (expectedRole && user.role !== expectedRole) {
      return res.status(403).json({ message: `This is not ${expectedRole} account` });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        email: user.email,
        role: user.role,
        name: user.name,
        phoneNumber: user.phoneNumber,
        ...(user.vehicleType && { vehicleType: user.vehicleType }),
        ...(user.licenseNumber && { licenseNumber: user.licenseNumber }),
        ...(user.restaurantName && { restaurantName: user.restaurantName }),
        ...(user.restaurantAddress && { restaurantAddress: user.restaurantAddress }),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
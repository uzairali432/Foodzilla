import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

import User from '../models/User.js';

const router = express.Router();

const validationOptions = {
  abortEarly: false,
  stripUnknown: true,
};

const formatValidationErrors = (error) => {
  if (!error?.details?.length) {
    return ['Invalid request data'];
  }

  return [...new Set(error.details.map((detail) => detail.message))];
};

// validation schemas
const registerSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Enter a valid email address (example: alex@example.com)',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),
  role: Joi.string().valid('customer', 'vendor', 'rider', 'admin').required().messages({
    'any.only': 'Role must be one of: customer, vendor, rider, admin',
    'string.empty': 'Role is required',
    'any.required': 'Role is required',
  }),
  name: Joi.string().trim().min(2).max(20).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name must be 20 characters or fewer',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Phone number must be 10 to 15 digits and may start with +',
      'any.required': 'Phone number is required',
    }),
  vehicleType: Joi.string()
    .valid('Car', 'Bike', 'Truck', 'Bus', 'Van')
    .insensitive()
    .when('role', {
      is: 'rider',
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      'any.only': 'Vehicle type must be one of: Car, Bike, Truck, Bus, Van',
      'any.required': 'Vehicle type is required for rider accounts',
      'any.unknown': 'Vehicle type should only be provided for rider accounts',
    }),
  licenseNumber: Joi.string()
    .pattern(/^[A-Za-z0-9\-\s]{5,20}$/)
    .when('role', {
      is: 'rider',
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      'string.pattern.base': 'License number must be 5 to 20 characters (letters, numbers, spaces, or hyphens)',
      'any.required': 'License number is required for rider accounts',
      'any.unknown': 'License number should only be provided for rider accounts',
    }),
  // vendor users can provide restaurant details
  restaurantName: Joi.string().trim().min(2).max(50).when('role', {
    is: 'vendor',
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }).messages({
    'string.min': 'Restaurant name must be at least 2 characters',
    'string.max': 'Restaurant name must be 50 characters or fewer',
    'any.unknown': 'Restaurant name should only be provided for vendor accounts',
  }),
  restaurantAddress: Joi.string()
    .trim()
    .min(5)
    .max(100)
    .when('role', { is: 'vendor', then: Joi.optional(), otherwise: Joi.forbidden() })
    .messages({
      'string.min': 'Restaurant address must be at least 5 characters',
      'string.max': 'Restaurant address must be 100 characters or fewer',
      'any.unknown': 'Restaurant address should only be provided for vendor accounts',
    }),
  businessName: Joi.string().trim().min(2).max(50).when('role', {
    is: 'vendor',
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }).messages({
    'string.min': 'Business name must be at least 2 characters',
    'string.max': 'Business name must be 50 characters or fewer',
    'any.unknown': 'Business name should only be provided for vendor accounts',
  }),
  address: Joi.string().trim().min(5).max(100).when('role', {
    is: 'vendor',
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }).messages({
    'string.min': 'Address must be at least 5 characters',
    'string.max': 'Address must be 100 characters or fewer',
    'any.unknown': 'Address should only be provided for vendor accounts',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Enter a valid email address (example: alex@example.com)',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
  expectedRole: Joi.string().valid('customer', 'vendor', 'rider', 'admin').optional().messages({
    'any.only': 'Expected role must be one of: customer, vendor, rider, admin',
  }),
});

// register route
router.post('/register', async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body, validationOptions);
    if (error) {
      const errors = formatValidationErrors(error);
      return res.status(400).json({
        message: errors[0],
        errors,
      });
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
    const { error, value } = loginSchema.validate(req.body, validationOptions);
    if (error) {
      const errors = formatValidationErrors(error);
      return res.status(400).json({
        message: errors[0],
        errors,
      });
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
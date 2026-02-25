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
  role: Joi.string().valid('customer', 'seller', 'vendor', 'rider').required(),
  name: Joi.string().min(2).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required(),
  // when the user is a seller, we need restaurant information
  restaurantName: Joi.string().min(2).max(50).when('role', {
    is: 'seller',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  restaurantAddress: Joi.string()
    .min(5)
    .max(100)
    .when('role', { is: 'seller', then: Joi.required(), otherwise: Joi.forbidden() }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// register route
router.post('/register', async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password, role, name, phoneNumber, restaurantName, restaurantAddress } = value;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const userData = { email, password: hashed, role, name, phoneNumber };
    if (role === 'seller') {
      userData.restaurantName = restaurantName;
      userData.restaurantAddress = restaurantAddress;
    }
    const user = new User(userData);
    await user.save();

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

    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
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
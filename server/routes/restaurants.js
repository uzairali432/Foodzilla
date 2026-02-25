import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';

const router = express.Router();

// return all sellers (restaurants)
router.get('/', async (req, res) => {
  try {
    const sellers = await User.find({ role: 'seller' }).select('-password');
    res.json(sellers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// get products for a particular restaurant
router.get('/:id/products', async (req, res) => {
  try {
    const products = await Product.find({ seller: req.params.id });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

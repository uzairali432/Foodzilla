import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';

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

// get single restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await User.findById(req.params.id).select('-password');
    if (!restaurant || restaurant.role !== 'seller') {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// create new review for restaurant
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const restaurant = await User.findById(req.params.id);

    if (!restaurant || restaurant.role !== 'seller') {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const alreadyReviewed = restaurant.reviews.find(
      (r) => r.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Restaurant already reviewed' });
    }

    const user = await User.findById(req.user.id);

    const review = {
      name: user.name || 'Anonymous',
      rating: Number(rating),
      comment,
      user: req.user.id,
    };

    restaurant.reviews.push(review);
    restaurant.numReviews = restaurant.reviews.length;
    restaurant.rating =
      restaurant.reviews.reduce((acc, item) => item.rating + acc, 0) /
      restaurant.reviews.length;

    await restaurant.save();
    res.status(201).json({ message: 'Review added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

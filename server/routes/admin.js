import express from 'express';

import auth from '../middleware/auth.js';
import User from '../models/User.js';
import Order from '../models/Order.js';

const router = express.Router();

const ensureAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  return next();
};

router.use(auth, ensureAdmin);

router.get('/vendors/pending', async (req, res) => {
  try {
    const vendors = await User.find({ role: 'vendor', approvalStatus: 'pending' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(vendors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/vendors/:id/approve', async (req, res) => {
  try {
    const vendor = await User.findOne({ _id: req.params.id, role: 'vendor' });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    vendor.approvalStatus = 'approved';
    vendor.isActive = true;
    await vendor.save();

    res.json({ message: 'Vendor approved successfully', vendor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/vendors/:id/reject', async (req, res) => {
  try {
    const vendor = await User.findOne({ _id: req.params.id, role: 'vendor' });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    vendor.approvalStatus = 'rejected';
    vendor.isActive = false;
    await vendor.save();

    res.json({ message: 'Vendor rejected', vendor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const query = {};
    if (req.query.role) {
      query.role = req.query.role;
    }

    const users = await User.find(query).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/users/:id/toggle-status', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Admin status cannot be changed' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({ message: 'User status updated', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Admin user cannot be removed' });
    }

    await user.deleteOne();
    res.json({ message: 'User removed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('customer', 'name email')
      .populate('vendor', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

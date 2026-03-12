import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST /api/orders — customer places an order
// Reads items from body, derives vendor from the first product's seller field
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ message: 'Only customers can place orders' });
    }

    const { items, deliveryAddress, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    // Derive vendor from first item's product record
    const firstProduct = await Product.findById(items[0].product).select('seller');
    const vendor = firstProduct?.seller || null;

    const orderNumber = `FZ-${Date.now()}`;
    const order = new Order({
      orderNumber,
      customer: req.user.id,
      vendor,
      items,
      totalAmount,
      deliveryAddress,
      status: 'Pending',
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/orders/vendor — vendor fetches only their orders
router.get('/vendor', auth, async (req, res) => {
  try {
    if (req.user.role !== 'vendor') {
      return res.status(403).json({ message: 'Vendor access required' });
    }
    const orders = await Order.find({ vendor: req.user.id })
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/orders/:id/status — vendor updates order status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'vendor') {
      return res.status(403).json({ message: 'Vendor access required' });
    }

    const allowed = ['Pending', 'Processing', 'Delivered', 'Cancelled'];
    const { status } = req.body;
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Ensure the order belongs to this vendor
    const order = await Order.findOne({ _id: req.params.id, vendor: req.user.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';
import Stripe from 'stripe';

const router = express.Router();
let stripeClient = null;

const getStripeClient = () => {
  if (stripeClient) return stripeClient;
  const stripeSecretKey = globalThis.process?.env?.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) return null;
  stripeClient = new Stripe(stripeSecretKey);
  return stripeClient;
};

const buildCheckoutLineItems = (items, totalAmount) => {
  const productSubtotal = items.reduce((sum, item) => {
    const unitAmount = Math.round(Number(item.price || 0) * 100);
    const quantity = Number(item.quantity || 0);
    return sum + unitAmount * quantity;
  }, 0);

  const deliveryAmount = Math.max(0, Math.round(Number(totalAmount || 0) * 100) - productSubtotal);

  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name || 'Food Item',
      },
      unit_amount: Math.round(Number(item.price || 0) * 100),
    },
    quantity: Number(item.quantity || 1),
  }));

  if (deliveryAmount > 0) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Delivery Fee',
        },
        unit_amount: deliveryAmount,
      },
      quantity: 1,
    });
  }

  return lineItems;
};

// POST /api/orders/create-checkout-session — customer starts Stripe Checkout
router.post('/create-checkout-session', auth, async (req, res) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ message: 'Only customers can place orders' });
    }

    const stripe = getStripeClient();
    if (!stripe) {
      return res.status(500).json({ message: 'Stripe is not configured on the server' });
    }

    const { items, deliveryAddress, totalAmount } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    const firstProduct = await Product.findById(items[0].product).select('seller');
    const vendor = firstProduct?.seller || null;

    const orderNumber = `FZ-${Date.now()}`;
    const order = await Order.create({
      orderNumber,
      customer: req.user.id,
      vendor,
      items,
      totalAmount,
      deliveryAddress,
      status: 'Pending',
      paymentMethod: 'stripe',
      paymentStatus: 'Unpaid',
    });

    const clientUrl = globalThis.process?.env?.CLIENT_URL || 'http://localhost:5173';
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: buildCheckoutLineItems(items, totalAmount),
      success_url: `${clientUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/payment-cancel?order_id=${order._id}`,
      metadata: {
        orderId: String(order._id),
        customerId: String(req.user.id),
      },
    });

    order.stripeSessionId = session.id;
    await order.save();

    return res.status(201).json({
      checkoutUrl: session.url,
      orderId: order._id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to create checkout session' });
  }
});

// POST /api/orders/confirm-payment — customer confirms completed Stripe payment
router.post('/confirm-payment', auth, async (req, res) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ message: 'Only customers can confirm payment' });
    }

    const stripe = getStripeClient();
    if (!stripe) {
      return res.status(500).json({ message: 'Stripe is not configured on the server' });
    }

    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ message: 'Missing sessionId' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ message: 'Payment not completed yet' });
    }

    const order = await Order.findOne({ stripeSessionId: sessionId, customer: req.user.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found for this session' });
    }

    order.paymentStatus = 'Paid';
    order.paidAt = new Date();
    await order.save();

    return res.json({
      message: 'Payment confirmed',
      orderNumber: order.orderNumber,
      order,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to confirm payment' });
  }
});

// POST /api/orders/cancel-payment — customer marks checkout cancellation
router.post('/cancel-payment', auth, async (req, res) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ message: 'Only customers can cancel payment' });
    }

    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: 'Missing orderId' });
    }

    const order = await Order.findOne({ _id: orderId, customer: req.user.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.paymentStatus === 'Unpaid') {
      order.paymentStatus = 'PaymentFailed';
      await order.save();
    }

    return res.json({ message: 'Payment cancelled' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to cancel payment' });
  }
});

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
      paymentMethod: 'cod',
      paymentStatus: 'Unpaid',
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

// GET /api/orders/rider — rider fetches only assigned orders
router.get('/rider', auth, async (req, res) => {
  try {
    if (req.user.role !== 'rider') {
      return res.status(403).json({ message: 'Rider access required' });
    }
    const orders = await Order.find({ rider: req.user.id })
      .populate('customer', 'name email phoneNumber')
      .populate('vendor', 'name restaurantName restaurantAddress')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/orders/available — rider sees processable, unassigned deliveries
router.get('/available', auth, async (req, res) => {
  try {
    if (req.user.role !== 'rider') {
      return res.status(403).json({ message: 'Rider access required' });
    }
    const orders = await Order.find({ status: 'Processing', rider: null })
      .populate('customer', 'name email phoneNumber')
      .populate('vendor', 'name restaurantName restaurantAddress')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/orders/:id/assign-rider — rider self-assigns an available order
router.patch('/:id/assign-rider', auth, async (req, res) => {
  try {
    if (req.user.role !== 'rider') {
      return res.status(403).json({ message: 'Rider access required' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'Processing') {
      return res.status(400).json({ message: 'Only processing orders can be assigned' });
    }

    if (order.rider && String(order.rider) !== String(req.user.id)) {
      return res.status(409).json({ message: 'Order is already assigned to another rider' });
    }

    order.rider = req.user.id;
    order.status = 'OutForDelivery';
    await order.save();

    const populated = await Order.findById(order._id)
      .populate('customer', 'name email phoneNumber')
      .populate('vendor', 'name restaurantName restaurantAddress')
      .populate('rider', 'name email phoneNumber vehicleType');

    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/orders/:id/rider-status — rider updates assigned delivery status
router.patch('/:id/rider-status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'rider') {
      return res.status(403).json({ message: 'Rider access required' });
    }

    const allowed = ['OutForDelivery', 'Delivered', 'Cancelled'];
    const { status } = req.body;
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findOne({ _id: req.params.id, rider: req.user.id });
    if (!order) {
      return res.status(404).json({ message: 'Assigned order not found' });
    }

    order.status = status;
    await order.save();
    res.json(order);
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

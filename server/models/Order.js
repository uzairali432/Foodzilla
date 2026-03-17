import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    items: { type: [orderItemSchema], default: [] },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'OutForDelivery', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'cod'],
      default: 'stripe',
    },
    paymentStatus: {
      type: String,
      enum: ['Unpaid', 'Paid', 'Refunded', 'PaymentFailed'],
      default: 'Unpaid',
    },
    stripeSessionId: { type: String, default: null },
    paidAt: { type: Date, default: null },
    deliveryAddress: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);

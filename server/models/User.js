import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['customer', 'seller', 'vendor', 'rider'],
      required: true,
    },
    name: { type: String },
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
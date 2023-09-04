import mongoose from "mongoose";

const Cart = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel' },
      quantity: { type: Number, default: 1 }
    }
  ]
});

export default Cart
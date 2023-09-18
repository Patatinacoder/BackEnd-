import mongoose from "mongoose";

const Cart = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel' },
      quantity: { type: Number, required: true, min: 1,  default: 1 },
      price: {type: Number, required: true, min : 0}
    }
  ]
});

export default Cart
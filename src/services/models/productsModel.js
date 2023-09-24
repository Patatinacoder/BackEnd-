import mongoose from "mongoose";

const Product = mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  thumbnail:{
    type: String,
    required:true,
  },
  code:{
    type: Number,
    required: true,
  },
  
});

export default mongoose.model('Product', Product);
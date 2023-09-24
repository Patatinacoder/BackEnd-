import mongoose from 'mongoose';
import Product from './models/productsModel.js'
class ProductServices {
  constructor() {
  }

  async getProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
     const productsModel = mongoose.model('Product')
     const newProduct = new productsModel({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });

      await newProduct.save();
      return newProduct
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error('Producto no encontrado.');
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
    try {
      const product = await Product.findByIdAndUpdate(
        id,
        { title, description, price, thumbnail, code, stock },
        { new: true }
      );

      if (!product) {
        throw new Error('Producto no encontrado.');
      }

      console.log('Producto actualizado con éxito:', product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        throw new Error('Producto no encontrado.');
      }

      console.log('Producto eliminado con éxito:', product);
      return product;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductServices();

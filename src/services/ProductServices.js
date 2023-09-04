import Product from './models/productsModel.js'
class ProductService {
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
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error("Todos los campos son obligatorios.");
      }

      const existingProduct = await Product.findOne({ code });
      if (existingProduct) {
        throw new Error("El código ya existe.");
      }

      const newProduct = new Product({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });

      await newProduct.save();
      console.log('Producto agregado con éxito:', newProduct);
      return newProduct;
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

export default new ProductService();

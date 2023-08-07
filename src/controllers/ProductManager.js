import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.product = [];
    this.path = path || './products.json';
  }

  async getProducts() {
    try {
      let productsData = await fs.promises.readFile(this.path, 'utf8');
      this.product = JSON.parse(productsData).map((product) => ({
        ...product,
        id: parseInt(product.id),
      }));
      return this.product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error('All fields are required');
      }

      let maxId = 0;
      if (this.product.length !== 0) {
        if (this.product.some((product) => product.code === code)) {
          throw new Error('Code already exists.');
        }
      }

      maxId++;
      let newProduct = { id: this.addNewId(), title, description, price, thumbnail, code, stock };
      this.product.push(newProduct);
      console.log(this.product);
      await fs.promises.writeFile(this.path, JSON.stringify(this.product));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  addNewId() {
    return this.product.length + 1;
  }

  async getProductById(id) {
    try {
      let products = await this.getProducts();
      let product = products.find((product) => product.id === Number(id));
      if (!product) {
        throw new Error('Not found.');
      }
      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
    try {
      let products = await this.getProducts();
      const productId = parseInt(id);

      const productIndex = products.findIndex((product) => product.id === productId);

      if (productIndex === -1) {
        throw new Error('Product not found.');
      }

      if (products.some((otherProduct) => otherProduct.code === code && otherProduct.id === productId)) {
        throw new Error('Code already exists.');
      }

      products[productIndex] = {
        ...products[productIndex],
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      await fs.promises.writeFile(this.path, JSON.stringify(products));

      console.log('Successfully updated');
      return products[productIndex];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      let products = await this.getProducts();
      let index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        throw new Error('Not found.');
      }
      products.splice(index, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log(products);
      return console.log('Successfully deleted');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ProductManager;

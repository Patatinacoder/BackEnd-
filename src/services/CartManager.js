import fs from 'fs';

class CartManager {
  constructor(path) {
    this.path = path || './carts.json';
    this.carts = []
  }

  async getCarts() {
    try {
      const cartsData = await fs.promises.readFile(this.path, 'utf8');
      return JSON.parse(cartsData);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addCart() {
    try {
      const carts = await this.getCarts();
      const newCart = { id: this.generateId(), products: [] };
      carts.push(newCart);
      await this.saveCarts(carts);
      return newCart;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find(cart => cart.id === cartId);
      if (!cart) {
        throw new Error('Cart not found.');
      }
      return cart;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex(cart => cart.id === cartId);

      if (cartIndex === -1) {
        throw new Error('Cart not found.');
      }

      const cart = carts[cartIndex];
      const existingProduct = cart.products.find(product => product.id === productId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ id: productId, quantity });
      }

      await this.saveCarts(carts);
      return cart;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async saveCarts(carts) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  generateId() {
    const existingIds = new Set(this.carts.map(cart => cart.id));
    let newId;
    do {
      newId = String(Math.floor(Math.random() * 1000)); // Generar un ID aleatorio como cadena
    } while (existingIds.has(newId));
    return newId;
  }
}

export default CartManager;

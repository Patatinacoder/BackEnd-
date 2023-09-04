import Cart from './models/cartModel.js';

class CartService {
  constructor() {
    // Puedes inicializar aquí cualquier configuración adicional si es necesario.
  }

  async getCarts() {
    try {
      const carts = await Cart.find();
      return carts;
    } catch (error) {
      throw error;
    }
  }

  async addCart() {
    try {
      const newCart = new Cart({ products: [] });
      await newCart.save();
      console.log('Carrito agregado con éxito:', newCart);
      return newCart;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado.');
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);

      if (!cart) {
        throw new Error('Carrito no encontrado.');
      }

      const existingProduct = cart.products.find(product => product.id === productId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ id: productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  }
}

export default new CartService();

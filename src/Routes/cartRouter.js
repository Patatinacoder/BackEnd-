import express from 'express';
import CartManager from '../controllers/CartManager.js';

const cartRouter = express.Router();
const cartManager = new CartManager();

cartRouter.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.addCart();
    res.status(201).json({ message: 'Cart successfully created', cart: newCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.get('/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await cartManager.getCartById(cartId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

cartRouter.post('/:cartId/product/:productId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const { quantity } = req.body;

    await cartManager.addProductToCart(cartId, productId, quantity);
    res.status(200).json({ message: 'Product successfully added to cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default cartRouter;

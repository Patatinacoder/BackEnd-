import { Router } from 'express';
import CartService from '../services/CartServices.js';
const cartRouter = Router();

cartRouter.get('/carts', async (req, res) => {
  try {
    const carts = await CartService.getCarts();
    res.status(200).json(carts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los carritos');
  }
});

cartRouter.post('/carts', async (req, res) => {
  try {
    const newCart = await CartService.addCart();
    res.status(201).json(newCart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al agregar el carrito');
  }
});

cartRouter.get('/carts/:id', async (req, res) => {
  const cartId = req.params.id;
  try {
    const cart = await CartService.getCartById(cartId);
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el carrito');
  }
});

cartRouter.post('/carts/:cartId/products/:productId', async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;
  const { quantity } = req.body;
  try {
    const cart = await CartService.addProductToCart(cartId, productId, quantity);
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al agregar el producto al carrito');
  }
});

export default cartRouter;

import { Router } from 'express';
import CartService from '../services/CartServices.js';
import Cart from '../services/models/cartsModel.js';
const cartRouter = Router();

cartRouter.get('/', async (req, res) => {
  try {
    const carts = await CartService.getCarts();
    res.status(200).json(carts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los carritos');
  }
});

cartRouter.post('/', async (req, res) => {
  try {
    const newCart = await CartService.addCart();
    res.status(201).json(newCart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al agregar el carrito');
  }
});

 cartRouter.get('/:id', async (req, res) => {
  const cartId = req.params.id;
  try {
    const cart = await CartService.getCartById(cartId);
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el carrito');
  }
});

cartRouter.post('/:cartId/products/:productId', async (req, res) => {
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

cartRouter.put('/cartId', async (req, res)=>{
  const cartId = req.params.cartId
  const {products} = req.body
  try{
    const cart= await CartService.findOneAndUpdate(
      {_id: cartId},
      {products: products},
      {new: true}
    ).populate('products.productId')
    if( !cart){
      return res.status(404).json({message: 'Carrito no encontrado'})
    } res.status(200).json(cart)
  }catch(error){
      console.log(error)
      res.status(500).json({error: error.message})
    }
  })

  cartRouter.put('/cartId/products/productId', async(req, res)=>{
    const cartId= req.params.cartId 
    const productId = req.params.productId
    const {quantity}= req.body

    try {
      const cart = await CartService.findOneAndUpdate(
        { _id: cartId, 'products.productId': productId },
        { $set: { 'products.$.quantity': quantity } },
        { new: true }
      ).populate('products.productId');
      if (!cart) {
        return res.status(404).json({ message: 'Carrito o producto no encontrado' });
      }
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  
  })
cartRouter.delete('/cartId/products/:productId', async (req, res)=>{
  const cartId = req.params.cartId
  const productId= req.params.productId
  try{
    const cart = await CartService.findOneAndUpdate({_id: cartId}, {$pull :{
      products: {productId: productId}}}, {new :true})
      if(!cart)
      {return  res.status(404).json({message : 'Carrito no encontrado'})
    }
    } catch(error){
      console.log(error)
      res.status(500).json({error: error.message})
    }
  
  })

  cartRouter.delete('/:cartId', async (req, res) => {
    const cartId = req.params.cartId;
    try {
      const cart = await CartService.findOneAndDelete({ _id: cartId });
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
      res.status(200).json({ message: 'Carrito eliminado con éxito'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

export default cartRouter;

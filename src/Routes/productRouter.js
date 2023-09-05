import { Router } from 'express';
import ProductService from '../services/ProductServices.js';
const productRouter = Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await ProductService.getProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los productos');
  }
});

productRouter.post('/', async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  try {
    const newProduct = await ProductService.addProduct(title, description, price, thumbnail, code, stock);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al agregar el producto');
  }
});

productRouter.get('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductService.getProductById(productId);
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el producto');
  }
});

productRouter.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;
  try {
    const updatedProduct = await ProductService.updateProduct(productId, updatedProductData);
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el producto');
  }
});

productRouter.delete('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await ProductService.deleteProduct(productId);
    res.status(200).json(deletedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar el producto');
  }
});

export default productRouter;

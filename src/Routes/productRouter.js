import express from 'express';
import ProductManager from '../controllers/ProductManager.js';

const productRouter = express.Router();
const productManager = new ProductManager();

productRouter.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productRouter.post('/', async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;
    await productManager.addProduct(title, description, price, thumbnail, code, stock);
    res.status(201).json({ message: 'Product successfully added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productRouter.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productManager.getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

productRouter.put('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const { title, description, price, thumbnail, code, stock } = req.body;

    await productManager.updateProduct(productId, { title, description, price, thumbnail, code, stock });
    res.status(200).json({ message: 'Product successfully updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productRouter.delete('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    await productManager.deleteProduct(productId);
    res.status(200).json({ message: 'Product successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default productRouter;

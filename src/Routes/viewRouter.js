import { Router } from "express"; 
import { fileURLToPath } from 'url';
import path from 'path';
import Product from '../services/models/productsModel.js'
import ProductServices from "../services/ProductServices.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewRouter = Router();

viewRouter.get('/api/products', async (req, res) => {
  try {
    const productServices = new ProductServices(Product);
    const products = await productServices.getProducts();
    res.render('layouts/realTimeProducts', {
      title: 'Lista de productos en tiempo real',
      products: products
    });
  } catch (error) {
    console.error('Error al obtener lista de productos:', error);
    res.status(500).send('Error al obtener lista de productos en tiempo real.');
  }
});


export default viewRouter
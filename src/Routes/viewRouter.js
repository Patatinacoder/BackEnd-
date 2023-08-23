import { Router } from "express"; 
import ProductManager from "../controllers/ProductManager.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewRouter = Router();
const productManager = new ProductManager('./products.json');

viewRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts();

    res.render('layouts/home', {
        products: products
    });
    
});

viewRouter.get('/realTimeProducts', async (req, res) => {
    try {
      const products = await productManager.getProducts();
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

import { Router } from "express"; 
import ProductManager from "../controllers/ProductManager.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("__dirname:", __dirname); // Agrega este console.log para verificar el valor de __dirname

const viewRouter = Router();
const productManager = new ProductManager('././products.json');

viewRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    console.log("View path:", path.join(__dirname, 'views')); // Agrega este console.log para verificar la ruta de las vistas

    res.render('home', {
        products: products
    });
    
});

viewRouter.get('/realTimeProducts', async (req, res) => {
    const products = await productManager.getProducts();
    console.log("View path:", path.join(__dirname, 'views')); // Agrega este console.log para verificar la ruta de las vistas
    res.render('realTimeProducts', {
        products: products
    });
});

export default viewRouter

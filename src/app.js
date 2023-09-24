import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose'; // Agrega esta importación
import productRouter from './Routes/productRouter.js';
import cartRouter from './Routes/cartRouter.js';
import viewsRouter from './Routes/viewRouter.js';
import dotenv from 'dotenv';
import ProductServices from './services/ProductServices.js';
import productsModel from './services/models/productsModel.js';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hbs = exphbs.create();


io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('productAddedToDB', async (newProduct) => {
    try {
      const productService = new ProductServices()
      const addedProduct = await productService.addProduct(
        newProduct.title,
        newProduct.description,
        newProduct.price,
        newProduct.thumbnail,
        newProduct.code,
        newProduct.stock
      );
      io.emit('productAddedToDB', addedProduct);
    } catch (error) {
      console.error('Error al agregar producto aaa:', error.message);
    }
  });
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('Error de conexión a MongoDB:', err);
  });

app.use((req, res, next) => {
  console.log(`Accessed route: ${req.method} ${req.url}`);
  next();
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
console.log('__dirname:', __dirname);

app.use(bodyParser.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.use('/', viewsRouter);
server.listen(8080, () => {
  console.log('Server running on port 8080');
});

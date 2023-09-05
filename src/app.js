import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; 
import productRouter from './Routes/productRouter.js';
import cartRouter from './Routes/cartRouter.js';
import viewsRouter from './Routes/viewRouter.js';
import ProductService from './services/ProductServices.js';
import MessagesService from './services/MessagesService.js';
import CartService from './services/CartServices.js';
import messageRouter from './Routes/messagesRouter.js';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hbs = exphbs.create();

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('productAddedToDB', async (data) => {
    try {
      const product = await ProductService.addProduct(data.title, data.description, data.price, data.thumbnail, data.code, data.stock);
      io.emit('productAddedToDB', product);
    } catch (error) {
      console.error('Error al agregar producto:', error.message);
      socket.emit('error', 'Error al agregar producto');
    }
  });

  socket.on('sendMessage', async (data) => {
    try {
      const message = await MessagesService.addMessage(data.user, data.message);
      io.emit('newMessage', message);
    } catch (error) {
      console.error('Error al enviar mensaje:', error.message);
      socket.emit('error', 'Error al enviar mensaje');
    }
  });

  socket.on('addCart', async () => {
    try {
      const cart = await CartService.addCart();
      io.emit('cartAddedToDB', cart);
    } catch (error) {
      console.error('Error al agregar carrito:', error.message);
      socket.emit('error', 'Error al agregar carrito');
    }
  });
});

app.use((req, res, next) => {
  console.log(`Accessed route: ${req.method} ${req.url}`);
  next();
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.use('/', viewsRouter);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

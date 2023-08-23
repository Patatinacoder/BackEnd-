import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import productRouter from './Routes/productRouter.js';
import cartRouter from './Routes/cartRouter.js';
import viewsRouter from './Routes/viewRouter.js'
import ProductManager from './controllers/ProductManager.js';


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const hbs = exphbs.create();


io.on('connection', (socket) => {
  console.log('Usuario conectado');

 

  socket.on('addProduct', async (newProduct) => {
    try {
      const productManager = new ProductManager('./products.json');
      const addedProduct = await productManager.addProduct(newProduct.title, newProduct.description, newProduct.price, newProduct.thumbnail, newProduct.code, newProduct.stock);
      io.emit('productAddedToDB', addedProduct);
    } catch (error) {
      console.error('Error al agregar producto:', error.message);
    }
  });  
});


app.use((req, res, next) => {
  console.log(`Accessed route: ${req.method} ${req.url}`);
  next(); 
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,  'views'))
console.log('__dirname:', __dirname);

app.use(bodyParser.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


app.use('/', viewsRouter)
server.listen(8080, () => {
  console.log("Server running on port 8080");
});

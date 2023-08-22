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


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const hbs = exphbs.create();

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('productAdded', (data) => {
    io.emit('productAdded', data);
  });
});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.use('/', viewsRouter)
server.listen(8080, () => {
  console.log("Server running on port 8080");
});

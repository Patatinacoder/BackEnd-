import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import productRouter from './Routes/productRouter.js';
import cartRouter from './Routes/cartRouter.js';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('productAdded', (data) => {
        io.emit('productAdded', data);
        console.log('product added in real-time', data);
    });
});

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());

app.use('/api/products', productRouter);

app.use('/api/carts', cartRouter);

server.listen(8080, () => {
    console.log("Server running on port 8080");
});

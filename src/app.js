import express from 'express';
import bodyParser from 'body-parser';
import productRouter from './Routes/productRouter.js'
import cartRouter from './Routes/cartRouter.js';
const app = express();


app.use(bodyParser.json());

app.use('/api/products', productRouter)

app.use('/api/carts', cartRouter)

app.listen(8080, () => {
    console.log("Server running on port 8080");
});

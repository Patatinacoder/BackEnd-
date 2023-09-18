import { Router } from 'express';
import ProductService from '../services/ProductServices.js';
const productRouter = Router();

productRouter.get('/', async (req, res) => {
const limit = parseInt(req.query.limit) || 10;
const page = parseInt(req.query.page) || 1;
const sort = req.query.sort === 'desc'?- 1 : 1 ;
const query = req.query.query;
try{
  const {docs, totalPages, prevPage, nextPage,page : currentPage, hasPrevPAge, hasNextPage}=await
  ProductService.getPaginatedProducts(
    limit,
    page,
    sort,
    query
  );
  const result = {
    status: 'success',
    playload: docs,
    totalPages,
    prevPage,
    nextPage,
    currentPage,
    hasPrevPAge,
    hasNextPage,
    prevLink: prevPage ? `/api/v1/products?limit=${limit}&page=${prevPage}&query=${query || ''}&sort=${req.query.sort || ''}`: null,
    nextLink: nextPage? `/api/v1/products?limit=${limit}&page=${nextPage}&query=${query || ''}&sort=${req.query.sort || ''}`: null
  }
  res.status(200).json(result)
}catch(err){
  console.log(err)
  res.status(500).send('Error al obtener los productos')
}
// try{
//   //   const products = await ProductService.getProducts();
//   //   res.status(200).json(products);
//   // } catch (err) {
//   //   console.error(err);
//   //   res.status(500).send('Error al obtener los productos');
//   }
});


productRouter.get('/category/:category', async (req,res)=>{
  const category = req.params.category
  try{
    const products=await ProductService.getProductsByCategory(category);
    res.status(200).json(products)
  } catch(err){
    console.log(err)
    res.status(500).send('Error al obtener los productos')
  }
})

productRouter.get('/available', async (req, res)=>{
  try{
    const {docs, totalPages, prevPage, nextPage, page:currentPage, hasPrevPage, hasNextPage} = await 
    ProductService.getPaginatedProducts(
      req.query.limit,
      req.query.page,
      req.query.sort,
      '',
      true
    );
    const result = {
      status: 'success',
      payload: docs,
      totalPages,
      prevPage,
      nextPage,
      currentPage,
      hasPrevPage,
      hasNextPage,
      prevLink: prevPage ? `/api/v1/products/available?limit=${req.query.limit}&page=${prevPage}&sort=${req.query.sort || 'asc'}` : null,
      nextLink: nextPage ? `/api/v1/products/available?limit=${req.query.limit}&page=${nextPage}&sort=${req.query.sort || 'asc'}` : null,
    };
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener productos');
  }
});

productRouter.post('/', async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  try {
    const newProduct = await ProductService.addProduct(title, description, price, thumbnail, code, stock);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al agregar el producto');
  }
});

productRouter.get('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductService.getProductById(productId);
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el producto');
  }
});

productRouter.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;
  try {
    const updatedProduct = await ProductService.updateProduct(productId, updatedProductData);
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el producto');
  }
});

productRouter.delete('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await ProductService.deleteProduct(productId);
    res.status(200).json(deletedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar el producto');
  }
});

export default productRouter;

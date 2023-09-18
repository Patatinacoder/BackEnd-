import Product from './models/productsModel.js'
class ProductService {
  constructor() {
  }

  async getProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error("Todos los campos son obligatorios.");
      }

      const existingProduct = await Product.findOne({ code });
      if (existingProduct) {
        throw new Error("El código ya existe.");
      }

      const newProduct = new Product({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });

      await newProduct.save();
      console.log('Producto agregado con éxito:', newProduct);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async getPaginatedProducts(limit =10 , page = 1, sort='asc', query= '', available = false){
    const maxLimit= 50;
    const defaultLimit= 10;
    limit= isNaN(limit) ? defaultLimit : Math.min(parseInt(limit),
    maxLimit)
    page= isNaN(page) ? 1 : parseInt(page)
    sort = sort == 'desc' ? -1:1

    const filter = query ? {category : query} : {}
    if(available){
      filter.stock = {$gt: 0}
    }
    const options = {limit, page, sort, collation : {locale : 'en'}}

    try{
      const result = await Product.paginate(filter, options)
      return result
    } catch (error){
      console.log(error)
      throw error
    }
  }

  async getProductsByCategory(category){
    return await Product.find({category, stock:{$gt:0}})
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error('Producto no encontrado.');
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
    try {
      const product = await Product.findByIdAndUpdate(
        id,
        { title, description, price, thumbnail, code, stock },
        { new: true }
      );

      if (!product) {
        throw new Error('Producto no encontrado.');
      }

      console.log('Producto actualizado con éxito:', product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        throw new Error('Producto no encontrado.');
      }

      console.log('Producto eliminado con éxito:', product);
      return product;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductService();

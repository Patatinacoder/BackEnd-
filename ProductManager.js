const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.product=[]
        this.path = path= "\products.json";
    }

    async getProducts() {
        try {
            let products = await fs.promises.readFile(this.path, "utf8");
            console.log(products);
            return JSON.parse(products);
        } catch (error) {
            console.error(error);
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) throw new Error('All fields are required');
            //let products = await this.getProducts();
            let maxId = 0;
            if (!this.product == []){
                if (this.product.some(product => product.code === code)) throw new Error("Code already exists.");
                
               // products.forEach(product => { if (product.id > maxId) maxId = product.id} );
            }
            maxId++; 
            let newProduct = { id:this.addNewId(), title, description, price, thumbnail, code, stock };
            this.product.push(newProduct);
            console.log(this.product);
            await fs.promises.writeFile(this.path, JSON.stringify(this.product));

            
        } catch (error) {
            console.error(error);
        }
    }
    addNewId () {
        return this.product.length +1;
    }

    async getProductById(id) {
        try {
            let products = await this.getProducts();
            let product = products.find(product => product.id === id);
            if (!product) throw new Error("Not found.");
            console.log(product);
            return product;
        } catch (error) {
            console.error(error)
        }
    }

    async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
        try {
          let products = await this.getProducts();
          let index = products.findIndex((product) => product.id === id);
          if (index === -1) throw new Error("Not found.");
          let productToUpdate = { id, title, description, price, thumbnail, code, stock };
          products[index] = productToUpdate;
          await fs.promises.writeFile(this.path, JSON.stringify(products));
          console.log(products);
          return console.log("Successfully updated");
        } catch (error) {
          console.error(error);
        }
      }
      
    async deleteProduct(id) {
        try {
            let products = await this.getProducts();
            let index = products.findIndex(product => product.id === id);
            if (index === -1) throw new Error("Not found.")
            products.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            console.log(products);
            return console.log("successfully deleted");
        } catch (error) {
            console.error(error);
        }
    }
}


let productManager = new ProductManager("product.json");

productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc126",
  25
);

productManager.addProduct(
  "producto prueba 2 ",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "kjbc156",
  25
);

console.log(productManager.getProducts());

productManager.addProduct(
  "producto prueba 4",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc129903",
  25
);
productManager.addProduct(
    "producto prueba 6",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc129803",
    25
  );
console.log(productManager.getProducts());
 productManager.getProductById(3).then(product => console.log(product));

productManager
    .updateProduct(3,{
        title: "New title",
        description: "New description",
        price: "New price",
        thumbnail: "New thumbnail",
        code: "abc126",
        stock: "800",
    })
    .then((product) => console.log(product))
    .catch((error) => console.error(error));

productManager
    .deleteProduct(2)
    .then(() => console.log("Product deleted"))
    .catch((error) => console.error(error));
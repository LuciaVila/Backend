class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.error("El código ya está en uso");
            return;
        }

        const product = {
            id: this.nextId++,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error("Producto no encontrado");
        }
        return product;
    }
}

const productManager = new ProductManager();

productManager.addProduct("Camisa", "Camisa de algodón", 29.99, "camisa.jpg", "PROD001", 50);
productManager.addProduct("Pantalón", "Pantalón de mezclilla", 39.99, "pantalon.jpg", "PROD002", 30);

const allProducts = productManager.getProducts();
console.log(allProducts);

const productById = productManager.getProductById(2);
console.log(productById);

productManager.addProduct("Zapatos", "Zapatos de cuero", 59.99, "zapatos.jpg", "PROD001", 20);

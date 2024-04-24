const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(producto) {
        try {
            const productos = await this.getProductos();
            const nuevoProducto = {
                ...producto,
                id: productos.length + 1 
            };
            productos.push(nuevoProducto);
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2));
            return nuevoProducto;
        } catch (error) {
            throw new Error(`Error al agregar el producto: ${error.message}`);
        }
    }

    async getProductos() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
    }

    async getProductoPorId(id) {
        try {
            const productos = await this.getProductos();
            return productos.find(producto => producto.id === id);
        } catch (error) {
            throw new Error(`Error al obtener el producto por ID: ${error.message}`);
        }
    }

    async actualizarProducto(id, camposActualizados) {
        try {
            const productos = await this.getProductos();
            const indice = productos.findIndex(producto => producto.id === id);
            if (indice === -1) {
                throw new Error(`Producto con ID ${id} no encontrado`);
            }
            const productoActualizado = {
                ...productos[indice],
                ...camposActualizados
            };
            productos[indice] = productoActualizado;
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2));
            return productoActualizado;
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    }

    async eliminarProducto(id) {
        try {
            const productos = await this.getProductos();
            const indice = productos.findIndex(producto => producto.id === id);
            if (indice === -1) {
                throw new Error(`Producto con ID ${id} no encontrado`);
            }
            productos.splice(indice, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2));
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    }
}

module.exports = ProductManager;

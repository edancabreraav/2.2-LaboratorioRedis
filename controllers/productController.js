const conexion = require('../models/database');  // Importar la conexión con Redis

// Función para obtener los detalles de un producto
exports.getProductDetails = async (req, res) => {
    const { sucursalId, productId } = req.params;

    // Armar la clave con el formato: SUCURSAL:sucursalId:PRODUCTO:productId
    const redisKey = `SUCURSAL:${sucursalId}:PRODUCTO:${productId}`;

    try {
        // Obtener todos los detalles del producto desde Redis
        const productDetails = await conexion.hGetAll(redisKey);

        if (!productDetails || Object.keys(productDetails).length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res.status(200).json(productDetails);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        return res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};
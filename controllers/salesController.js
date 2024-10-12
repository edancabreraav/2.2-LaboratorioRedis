const conexion = require('../models/database');  // Importar la conexión con Redis

// Función para agregar una nueva venta
exports.addSale = async (req, res) => {
    const { sucursalId, ventaId, cliente, rfc, total, fecha, productos } = req.body;

    // Claves
    const redisKeyVenta = `SUCURSAL:${sucursalId}:VENTA:${ventaId}`;
    const redisKeyProductos = `SUCURSAL:${sucursalId}:VENTA:${ventaId}:PRODUCTOS`;

    try {
        // Agregar los detalles de la venta
        await conexion.hSet(redisKeyVenta, {
            cliente: `${rfc}, ${cliente}`,
            total: total.toString(),
            fecha: fecha
        });

        // Agregar los productos de la venta
        for (const [productId, productDetails] of Object.entries(productos)) {
            await conexion.hSet(redisKeyProductos, productId, productDetails);
        }

        return res.status(200).json({ message: 'Venta registrada exitosamente' });
    } catch (error) {
        console.error('Error al agregar la venta:', error);
        return res.status(500).json({ message: 'Error al registrar la venta', error });
    }
};

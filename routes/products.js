const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para obtener los detalles de un producto por ID y sucursal
router.get('/:sucursalId/product/:productId', productController.getProductDetails);

module.exports = router;
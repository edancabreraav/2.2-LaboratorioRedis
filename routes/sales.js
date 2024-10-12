const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// Ruta para agregar una nueva venta
router.post('/add', salesController.addSale);

module.exports = router;

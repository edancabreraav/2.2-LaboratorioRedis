const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Ruta para agregar un cliente y asociarlo a una sucursal
router.post('/add', clientController.addClient);

module.exports = router;

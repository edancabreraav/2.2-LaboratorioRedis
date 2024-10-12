const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Ruta para agregar un cliente y asociarlo a una sucursal
router.post('/add', clientController.addClient);
// Ruta para obtener el conjunto de clientes de una sucursal
router.get('/sucursal/:sucursalId/clientes', clientController.getClients);


module.exports = router;

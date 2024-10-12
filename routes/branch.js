const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

// Ruta para obtener sucursales cercanas dentro de un radio
router.get('/:longitud/:latitud/:radio', branchController.getBranches);

module.exports = router;

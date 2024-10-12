const conexion = require('../models/database');  // Importar la conexión con Redis

// Función para buscar sucursales cercanas
exports.getBranches = async (req, res) => {
    const { longitud, latitud, radio } = req.params;

    try {
        const branches = await conexion.sendCommand(['GEORADIUS', 'SUCURSAL:UBICACION', longitud, latitud, radio, 'km', 'WITHDIST', 'WITHCOORD']);
        
        if (!branches || branches.length === 0) {
            return res.status(400).json({ message: 'No se encontraron sucursales cercanas' });
        }

        return res.status(200).json(branches);
    } catch (error) {
        console.error('Error al buscar sucursales cercanas:', error);
        return res.status(500).json({ message: 'Error al buscar sucursales cercanas', error });
    }
};

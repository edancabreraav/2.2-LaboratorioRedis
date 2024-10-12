const conexion = require('../models/database');  // Importar la conexión con Redis

// Función para agregar un cliente y asociarlo a una sucursal
exports.addClient = async (req, res) => {
    const { rfc, nombre, sucursalId } = req.body;

    // Armar la clave con el formato: SUCURSAL:1000:CLIENTES
    const redisKeySucursalClientes = `SUCURSAL:${sucursalId}:CLIENTES`;

    try {
        // Agregar al conjunto global de clientes
        await conexion.sAdd(redisKeySucursalClientes, `${rfc}, ${nombre}`);
        
        // Agregar al conjunto cliente-sucursal
        await conexion.sAdd('CLIENTES', `cliente:${rfc}:nombre:${nombre}`);

        return res.status(200).json({ message: 'Cliente agregado' });
    } catch (error) {
        console.error('Error al agregar el cliente:', error);
        return res.status(500).json({ message: 'Error al agregar el cliente', error });
    }
};

// Función para listar el conjunto de clientes de una sucursal
exports.getClients = async (req, res) => {
    const { sucursalId } = req.params;

    // Armar la clave con el formato: SUCURSAL:1000:CLIENTES
    const redisKey = `SUCURSAL:${sucursalId}:CLIENTES`;

    try {
        // Obtener el conjunto de clientes
        const clientSet = await conexion.sMembers(redisKey);

        if (!clientSet || clientSet.length === 0) {
            return res.status(404).json({ message: 'Conjunto vacío' });
        }

        return res.status(200).json(clientSet);
    } catch (error) {
        console.error('Error al obtener el conjunto:', error);
        return res.status(500).json({ message: 'Error al obtener el conjunto', error });
    }
};

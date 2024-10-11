const express = require('express');
const dotenv = require('dotenv');
const conexion = require('./models/database.js')

// Importación de rutas
const productRoutes = require('./routes/products');
const clientRoutes = require('./routes/client');
//const branchRoutes = require('./routes/branch')
//const salesRoutes = require('./routes/sales')


dotenv.config();

const app = express();

app.use(express.json());

// Conexión con Redis
conexion
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect()
    .then(() => console.log("Conectado a redis"));

//Rutas
app.use('/products', productRoutes);
app.use('/client', clientRoutes);
//app.use('/sale', salesRoutes);
//app.use('/branch', branchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
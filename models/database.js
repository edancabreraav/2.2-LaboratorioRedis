const redis = require("redis");
const dotenv = require('dotenv')

dotenv.config();

const conexion = redis.createClient({
    url: process.env.REDIS_URL,
});

module.exports = conexion
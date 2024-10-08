const mysql = require('mysql2/promise');
require('dotenv').config();

const config = {
    host: process.env.MYSQL_HOST, // Deve ser o IP privado
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const poolPromise = mysql.createPool(config)
    .then(pool => {
        console.log('Conectado ao MySQL');
        return pool;
    })
    .catch(err => {
        console.error('Erro ao conectar ao MySQL:', err);
    });

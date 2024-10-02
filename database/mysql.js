const mysql = require('mysql2/promise');
require('dotenv').config();

// Defina a configuração do MySQL usando variáveis de ambiente
const config = {
    host: process.env.MYSQL_HOST, // endereço do servidor MySQL
    user: process.env.MYSQL_USER, // usuário do MySQL
    password: process.env.MYSQL_PASSWORD, // senha do MySQL
    database: process.env.MYSQL_DATABASE, // nome do banco de dados
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Crie a pool de conexões
const poolPromise = mysql.createPool(config); // Não usa `then` aqui
console.log('Connected to MySQL');

module.exports = {
    mysql,
    poolPromise
};

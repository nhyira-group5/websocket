const mysql = require('mysql2/promise');
require('dotenv').config();

const config = {
    host: process.env.MYSQL_HOST, // endereço do servidor MySQL
    user: process.env.MYSQL_USER, // usuário do MySQL
    password: process.env.MYSQL_PASSWORD, // senha do MySQL
    database: process.env.MYSQL_DATABASE, // nome do banco de dados
    waitForConnections: true, // aguardar por conexões disponíveis
    connectionLimit: 10, // número máximo de conexões permitidas
    queueLimit: 0 // número máximo de solicitações em fila
}

const poolPromise = mysql.createPool(config)
    .then(pool => {
        console.log('Connected to MySQL');
        return pool;
    })
    .catch(err => {
        console.log('Database Connection Failed! Bad Config: ', err);
        throw err;
    });

module.exports = {
    mysql, poolPromise
};

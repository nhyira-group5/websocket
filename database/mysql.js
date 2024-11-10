const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

async function initializePool() {
    try {
        pool = mysql.createPool({
            host: process.env.MYSQL_HOST,       
            user: process.env.MYSQL_USER,       
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            waitForConnections: true,           
            connectionLimit: 10,                 
            queueLimit: 0                        
        });
        console.log('Pool de conexões criado com sucesso.');
    } catch (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        throw err; 
    }
}


initializePool();


module.exports = {
    getPool: () => pool,
};

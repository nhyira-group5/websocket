const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

async function initializePool() {
    try {
        pool = mysql.createPool({
            host: process.env.MYSQL_HOST,       // IP ou hostname do servidor MySQL
            user: process.env.MYSQL_USER,       // Nome de usuário do MySQL
            password: process.env.MYSQL_PASSWORD,// Senha do MySQL
            database: process.env.MYSQL_DATABASE,// Nome do banco de dados
            waitForConnections: true,            // Espera por conexões
            connectionLimit: 10,                 // Limite de conexões
            queueLimit: 0                         // Sem limite de fila
        });
        console.log('Pool de conexões criado com sucesso.');
    } catch (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        throw err; // Lançar erro para que a aplicação não continue se a conexão falhar
    }
}

// Chame a função de inicialização do pool
initializePool();

// Exportar o pool para ser usado em outros arquivos
module.exports = {
    getPool: () => pool,
};

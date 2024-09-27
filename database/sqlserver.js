const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.SQLSERVER_USER,
    password: process.env.SQLSERVER_PASSWORD,
    server: process.env.SQLSERVER_SERVER, 
    database: process.env.SQLSERVER_DATABASE,
    options: {
        encrypt: process.env.SQLSERVER_ENCRYPT === 'true', 
        trustServerCertificate: process.env.SQLSERVER_TRUST_SERVER_CERTIFICATE === 'true', // apenas para desenvolvimento
        enableArithAbort: true,
        hostNameInCertificate: process.env.SQLSERVER_HOST_NAME_IN_CERTIFICATE,
        loginTimeout: parseInt(process.env.SQLSERVER_LOGIN_TIMEOUT, 10) // tempo de espera para login
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.log('Database Connection Failed! Bad Config: ', err);
        throw err;
    });

module.exports = {
    sql, poolPromise
};

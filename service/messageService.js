const { sql, poolPromise } = require('../database/sqlserver');

module.exports.registerMessage = async message => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('chatId', sql.Int, message.chatId)
            .input('remetenteId', sql.Int, message.remetenteId)
            .input('destinatarioId', sql.Int, message.destinatarioId)
            .input('assunto', sql.VarChar(255), message.assunto)
            .query(`
                INSERT INTO mensagem (chat_id, remetente_id, destinatario_id, assunto, data_hora) 
                VALUES (@chatId, @remetenteId, @destinatarioId, @assunto, GETDATE())
            `);

        return result.recordset; 
    } catch (err) {
        console.error('Erro SQL', err);
        throw new Error('Falha na consulta ao banco de dados');
    }
};

module.exports.findByChatIdPageable = async (chatId, page, elements) => {
    try {
        const offset = (Number(page) - 1) * Number(elements);
        const limit = Number(elements);
        const pool = await poolPromise;

        const pageResults = await pool.request()
            .input('chatId', sql.Int, chatId)
            .input('limit', sql.Int, limit)
            .input('offset', sql.Int, offset)
            .query(`
                SELECT * FROM mensagem WHERE chat_id = ${chatId}
                ORDER BY data_hora DESC
            `);

        const totalCountResult = await pool.request()
            .input('chatId', sql.Int, chatId)
            .query(`SELECT COUNT(*) as total FROM mensagem WHERE chat_id = @chatId`);

        const totalCount = totalCountResult.recordset[0].total;

        return { page: pageResults.recordset, total: totalCount };
    } catch (err) {
        console.error('Erro SQL', err);
        throw new Error('Falha na consulta ao banco de dados');
    }
};

module.exports.findByChat = async (chatId) => {
    try{
        const pool = await poolPromise;

        const messages = pool.query(`SELECT * FROM mensagem WHERE chat_id = ${chatId}`);

        return messages;
    }catch(e) {
        console.log(e);
    }
}

module.exports.findChatByUsuario = async (usuario) => {
    try{
        const pool = await poolPromise;

        const chatEncontrado = pool.query(`SELECT * FROM Chat WHERE usuario_id = ${usuario} OR personal_id = ${usuario}`);
    
        return chatEncontrado;
    }catch(e) {
        console.error('Erro: ', e)
    }
}
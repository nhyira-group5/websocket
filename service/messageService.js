GNU nano 7.2                                                                                    messageService.js                                                                                              const { getPool } = require("../database/mysql");

module.exports.registerMessage = async (message) => {
    const pool = getPool(); // Obter o pool de conexões

    // Debug: Logar os dados da mensagem antes de executar a consulta
    console.log("Dados da mensagem:", message);

    // Defina destinatarioId como null se estiver undefined
    const destinatarioId = message.destinatario_id !== undefined ? message.destinatario_id : null;

    try {
        const [result] = await pool.execute(
            INSERT INTO mensagem (chat_id, remetente_id, destinatario_id, assunto, data_hora) VALUES (?, ?, ?, ?, NOW()),
            [
                message.chat_id,
                message.remetente_id,
                message.destinatario_id,  // Use a variável destinatarioId aqui
                message.assunto
            ]
        );
        return result;
    } catch (err) {
        console.error("Erro SQL:", err);
        throw new Error("Falha na consulta ao banco de dados");
    }
};

module.exports.findByChat = async (chatId) => {
    const pool = getPool(); // Obter o pool de conexões

    try {
        const [messages] = await pool.execute(
            SELECT * FROM mensagem WHERE chat_id = ?,
            [chatId]
        );
        return messages;
    } catch (err) {
        console.error("Erro SQL:", err);
        throw new Error("Falha na consulta ao banco de dados");
    }
};

module.exports.findChatByUsuario = async (usuario) => {
    const pool = getPool(); // Obter o pool de conexões

    try {
        const [chatEncontrado] = await pool.execute(
            SELECT chat_id FROM mensagem WHERE remetente_id = ? LIMIT 1,
            [usuario]
        );
        return chatEncontrado;
    } catch (err) {
        console.error("Erro SQL:", err);
        throw new Error("Falha na consulta ao banco de dados");
    }
};

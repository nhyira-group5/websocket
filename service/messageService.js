const { poolPromise } = require("../database/mysql");

module.exports.registerMessage = async (message) => {
  try {
    const pool = await poolPromise;
    const [result] = await pool.execute(
      `
        INSERT INTO mensagem (
          chat_id, 
          remetente_id, 
          destinatario_id, 
          assunto, 
          data_hora
        ) 
        VALUES (?, ?, ?, ?, NOW())
      `,
      [
        message.chat_id,
        message.remetente_id,
        message.destinatario_id,
        message.assunto,
      ]
    );

    return result;
  } catch (err) {
    console.error("Erro SQL:", err);
    throw new Error("Falha na consulta ao banco de dados");
  }
};

module.exports.findByChat = async (chatId) => {
  try {
    const pool = await poolPromise;
    const [messages] = await pool.execute(
      `SELECT * FROM mensagem WHERE chat_id = ?`, // Adicionando crase para a string SQL
      [chatId]
    );
    return messages;
  } catch (e) {
    console.error("Erro SQL:", e);
    throw new Error("Falha na consulta ao banco de dados");
  }
};

module.exports.findChatByUsuario = async (usuario) => {
  try {
    const pool = await poolPromise;
    const [chatEncontrado] = await pool.execute(
      `SELECT chat_id FROM mensagem WHERE remetente_id = ? LIMIT 1`, 
      [usuario]
    );
    console.log("Chat Encontrado:", chatEncontrado);
    return chatEncontrado;
  } catch (e) {
    console.error("Erro SQL:", e);
    throw new Error("Falha na consulta ao banco de dados");
  }
};

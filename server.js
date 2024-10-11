const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const service = require('./service/messageService');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/messages', require('./routes'));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
   origin: 'http://54.147.107.121' // Substituindo pelo novo domínio
  }
});

io.on('connection', (socket) => {
  console.log(`Usuário conectado: ${socket.id}`); // Corrigido para interpolação de string
  
  socket.on("send_message", async (data) => {
    console.log(data);
    
    await service.registerMessage(data);
    
    // Emitindo a mensagem recebida para todos os outros sockets
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log('Servidor funcionando na porta 3001'); // Corrigido para interpolação de string
});

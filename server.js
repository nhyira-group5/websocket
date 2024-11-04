const express = require('express');  
const http = require('http');  
const { Server } = require('socket.io');  
const cors = require('cors');  
const service = require('./service/messageService');  

const app = express();  

// Configurando CORS para o Express  
const corsOptions = {  
  // origin: 'http://vitalis-prod.zapto.org',
  origin: 'http://nhyira-prod.zapto.org',// Permitindo a origem do seu aplicativo  
  optionsSuccessStatus: 200 // Para suportar navegadores antigos  
};  

app.use(cors(corsOptions)); // Middleware CORS para todas as rotas  
app.use(express.json());  
app.use('/messages', require('./routes'));  

const server = http.createServer(app);  

// Configurando CORS para o Socket.IO  
const io = new Server(server, {  
  cors: {  
    origin: 'http://nhyira-prod.zapto.org', // Permitir a origem correta  
    methods: ['GET', 'POST'], // Métodos permitidos  
    credentials: true // Se você usa cookies/autenticação  
  }  
});  

io.on('connection', (socket) => {  
  console.log(`Usuário conectado: ${socket.id}`);  

  socket.on("send_message", async (data) => {  
    console.log(data);  

    await service.registerMessage(data);  

    // Emitindo a mensagem recebida para todos os outros sockets  
    socket.broadcast.emit("receive_message", data);  
  });  
});  

server.listen(3001, () => {  
  console.log('Servidor funcionando na porta 3001');  
});

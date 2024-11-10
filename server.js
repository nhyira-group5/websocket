const express = require('express');  
const http = require('http');  
const { Server } = require('socket.io');  
const cors = require('cors');  
const service = require('./service/messageService');  

const app = express();  


const corsOptions = {  
  origin: 'http://vitalis-uat.zapto.org',
  optionsSuccessStatus: 200
};  

app.use(cors(corsOptions)); 
app.use(express.json());  
app.use('/messages', require('./routes'));  

const server = http.createServer(app);  

 
const io = new Server(server, {  
  cors: {  
    origin: 'http://vitalis-uat.zapto.org', 
    methods: ['GET', 'POST'],  
    credentials: true  
  }  
});  

io.on('connection', (socket) => {  
  console.log(`Usuário conectado: ${socket.id}`);  

  socket.on("send_message", async (data) => {  
    console.log(data);  

    await service.registerMessage(data);  

   
    socket.broadcast.emit("receive_message", data);  
  });  
});  

server.listen(3001, () => {  
  console.log('Servidor funcionando na porta 3001');  
});

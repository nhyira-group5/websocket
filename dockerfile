# Use a imagem oficial do Node.js como base
FROM node:16

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e package-lock.json para o container
COPY package*.json ./

# Instale as dependências do projeto
RUN npm ci --force

# Instale o mysql2 se não estiver listado no package.json
RUN npm install mysql2

# Copie todo o código do aplicativo para o container
COPY . .

# Exponha a porta em que o aplicativo vai rodar
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["node", "server.js"]

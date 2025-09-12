# Usa uma imagem base oficial do Node.js (sem Cypress embutido)
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência para instalar os pacotes
COPY package.json package-lock.json ./

# Instala as dependências do projeto, incluindo Cypress na versão definida no package.json
RUN npm ci

# Copia todos os arquivos do projeto para dentro do container
COPY . .

# Define a variável de ambiente para desativar o cache do Cypress
ENV CYPRESS_CACHE_FOLDER=/root/.cache/Cypress

# Executa os testes do Cypress em modo headless (sem abrir navegador)
CMD ["npx", "cypress", "run"]

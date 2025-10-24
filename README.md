# Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas:
- Node.js
- Gerenciador de pacotes (npm ou yarn)
- Git

# Instruções de Instalação

## Front-end
1. Clone o repositório.
2. Abra o terminal do VSCode e navegue até a pasta front-end.
3. Execute `npm install` para instalar as dependências.
4. Inicie o servidor com `npm run dev`

## Back-end
1. Clone o repositório.
2. Abra o terminal do VSCode e navegue até a pasta back-end.
3. Execute `npm install` para instalar as dependências.
4. Configure o arquivo `.env` de acordo com o arquivo de exemplo `.env.example`.
5. Execute as migrações do banco de dados digitando `npx prisma migrate dev` no terminal.
6. Inicie o servidor com `npm run start: dev`.

# Documentação da API

Para mais detalhes sobre os endpoints, parâmetros e exemplos de uso da API, por favor consulte a documentação completa disponível em [http://localhost:3000/api](http://localhost:3000/api).
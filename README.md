# HUBHCAT  

- Projeto criado para code test na empresa Hublab.  

## Tecnologias  

- Node Js  
- Express  
- Socket IO  
- Openapi 3 || Swagger  
- Angular  
- MongoDB

## Execução (nécessario ter o NodeJs@16.10.0 instalado ou Docker)  

Para executar o projeto caso tenha o docker e o docker compose instalados:  
- Baixe o repositório  
- Acesse a pasta server-chat e execute o comando `docker compose up || docker-compose up -d`  
- Acesse a pasta front-chat e execute o comando `docker compose up || docker-compose up -d`  
- Acessar o link `http://localhost:4400`  

Para executar o projeto caso não tenha docker:
- Baixe o repositório  
- Acesse a pasta server-chat e execute o comando `npm install`  
- Na raiz do projeto cri um arquivo .env conforme o arquivo .env.example  
- Preencha a uri da sua base mongoDB na variável MONGO_URL  
- Preencha um password quolquer na variável TOKEN
- execute o comando `npm run dev`  
- Acesse a pasta front-chat e execute o comando `npm run start`   
- Acessar o link `http://localhost:4200`  

## Documentação  

Api server-chat foi documentada utilizando o swagger. Após executar o server-chat a mesma pode ser acessada através do link `http://localhost:3333/api-docs/` ou   [Heroku](https://hubchat-test.herokuapp.com/api-docs/) 

## Projeto online no heroku &&  netlify  

Projeto foi hospedado no heroku e no netlify, porem nao foi configurado o TZ então pode ocorrer algumas divergencias de timezone -3 horas  
- [Heroku](https://hubchat-test.herokuapp.com/api-docs/)  
- [Netlify](https://hublab-chat.netlify.app/#/chat/login)  



## Duvidas ou Sugestões  

[Email](mailto:gustavo93.lima@gmail.com)  

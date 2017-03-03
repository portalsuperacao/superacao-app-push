# Configurações iniciais
Para utilizar o servidor de Push Notification do chat, é necessario realizar as configurações de dados.

Abra o arquivo:
```sh
server-notification/app.js
```
Altere a seguinte variavel com seus dados:
```javascript
var config = {
  apiKey: '<YOUR DATA>',
  authDomain: '<YOUR DATA>',
  databaseURL: '<YOUR DATA>',
  messagingSenderId: '<YOUR DATA>'
}

...

 request({
      url: 'https://fcm.googleapis.com/fcm/send',
      method: 'POST',
      headers: {
        'Content-Type' :'<YOUR DATA>',
        'Authorization': '<YOUR DATA>'
      },
      body: JSON.stringify(obj)
...
```

# Build no docker
Para iniciar o projeto, faça os seguintes comandos:
```docker
docker build -t server-notification:1.0 . 
docker run -it -p 8080:8080 server-notification:1.0 bash
```

Após entrar no bash, execute a aplicação:
```sh
nodemon app.js
```
ou se preferir:
```sh
node app.js
```
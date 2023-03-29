const express = require('express');
const app = express();
const server = require("http").Server(app);

const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

const uuid = require("uuid");

app.use(express.static('public'));

const clients = new Map();

wss.on("connection", function(ws){
  console.log("nuevo cliente");
  //endpoint del servidor      ws servidor <---------> ws cliente
  ws.id = uuid.v4();
  clients.set(ws.id, ws);

  ws.on("message", function(message){
    console.log(ws.id, JSON.parse(message));
    clients.forEach( cws => {
      if(cws.id != ws.id) {
        cws.send(message);
      }
    });
  });
  
});

server.listen(3000, () => console.log('server started'));
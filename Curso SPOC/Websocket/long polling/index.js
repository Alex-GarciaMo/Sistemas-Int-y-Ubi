const express = require('express');
const app = express();

app.use('/', express.static('www'));

app.listen(function () {
  console.log('Servidor Express en escucha');
});

const subscribers = {};

function createMessageRandomTime(){
  const rnd = Math.floor(Math.random() * 10000);
  for(let uid in subscribers){
    subscribers[uid].messages.push({msgId: Date.now(), msg: Math.random().toString(36).substr(2, 5)});
    if(subscribers[uid].messages.length === 1 && subscribers[uid].wait) {
      subscribers[uid].wait = false;
      sendMessage(uid, subscribers[uid].res);
    } 
  }

  setTimeout(createMessageRandomTime, rnd);
}

createMessageRandomTime();

app.get('/subscribe/:uid', (req, res)=>{
  const uid = req.params.uid;
  subscribers[uid] = {};
  subscribers[uid].messages = [];
  subscribers[uid].wait = false;
  res.json({"msg": "ok"}) ;
  res.end();
});

app.get('/poll/:uid', (req, res)=>{
  const uid = req.params.uid;
  if(subscribers[uid].messages.length > 0) {
    sendMessage(uid, res);
  } else {
    subscribers[uid].res = res;
    subscribers[uid].wait = true;
  }
  
});

function sendMessage(uid, res) {
  const subscriber = subscribers[uid];
  res.json(subscriber.messages.shift());
  res.end();
}
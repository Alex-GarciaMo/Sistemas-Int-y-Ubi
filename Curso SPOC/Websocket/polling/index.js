const express = require('express');
const app = express();

app.use('/', express.static('www'));

app.listen(function () {
  console.log('Servidor Express en escucha');
});

const messages = {};

function createMessageRandomTime(){
  const rnd = Math.floor(Math.random() * 2000);
  for(let id in messages){
    messages[id].push({msgId: Date.now(), msg: Math.random().toString(36).substr(2, 5)});
  }

  setTimeout(createMessageRandomTime, rnd);
}

createMessageRandomTime();

app.get('/subscribe/:uid', (req, res)=>{
  const uid = req.params.uid;
  messages[uid] = [];
  res.json({"msg": "ok"}) ;
  res.end();
});

app.get('/poll/:uid', (req, res)=>{
  const uid = req.params.uid;
  messages[uid].length > 0 ? res.json(messages[uid].shift()) : res.json({});
  res.end();
});
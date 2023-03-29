const webSocket = new WebSocket("wss://websocketchat.andreabellucci1.repl.co");

const button = document.querySelector("button");
const input = document.querySelector("input");
const msg = document.querySelector("#msg");

button.addEventListener("click", function(e) {
  const text = input.value;
  //enviarselo al servidor
  webSocket.send(JSON.stringify({msg: text}));
});

webSocket.addEventListener("message", function(message){
  const data = JSON.parse(message.data);
  msg.innerHTML = data.msg;
});

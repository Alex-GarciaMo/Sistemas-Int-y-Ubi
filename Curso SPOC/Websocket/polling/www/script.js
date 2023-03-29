const uid = Math.random().toString(36).substr(2);
console.log(uid);
const log = document.querySelector("#log_msg");

async function subscribe(){
  const result = await fetch(`/subscribe/${uid}`);
  const data = await result.json();
  if (data.msg == "ok") {
    setInterval(poll, 1000);
    async function poll(){
      const result = await fetch(`/poll/${uid}`);
      const data = await result.json();
      data.msgId ? log.innerHTML = data.msg : log.innerHTML = "Ningún mensaje";
    }
  }
};

subscribe();



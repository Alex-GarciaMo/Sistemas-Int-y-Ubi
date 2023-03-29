const uid = Math.random().toString(36).substr(2);
console.log(uid);
const log = document.querySelector("#log_msg");

async function subscribe(){
  const result = await fetch(`/subscribe/${uid}`);
  const data = await result.json();
  if (data.msg == "ok") {
    async function poll(){
      const result = await fetch(`/poll/${uid}`);
      const data = await result.json();
      console.log(data)
      log.innerHTML = data.msg;
      await poll();
    }
    await poll();
  }
};

subscribe();

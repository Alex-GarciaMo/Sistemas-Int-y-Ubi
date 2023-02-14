const touches = [];

function removeTouch(touchId) {
  const idx = touches.findIndex(touch => touch.id === touchId);
  touches.splice(idx, 1);
  
  const touchEl = document.querySelector(`#touch-${touchId}`);
  touchEl.remove();
}

function addTouch(touch) {
  touches.push({
    id: touch.identifier,
    x: touch.clientX,
    y: touch.clientY,
  })
  
  const touchEl = document.createElement("div");
  touchEl.id = `touch-${touch.identifier}`;
  touchEl.classList.add("touch-point");
  document.body.appendChild(touchEl);
}

document.addEventListener("touchstart", function(e){
  console.log(e);
  addTouch(e.changedTouches[0]);
});

document.addEventListener("touchend", function(e){
  removeTouch(e.changedTouches[0].identifier);
});

document.addEventListener("touchmove", function(e){
  e.preventDefault();
  const changedTouches = e.changedTouches;
  for (let ct of changedTouches) {
    const idx = touches.findIndex(touch => touch.id === ct.identifier);
    const t = touches[idx];
    t.x = ct.clientX;
    t.y = ct.clientY;
  }
}, {passive: false});



requestAnimationFrame(onFrame)

function onFrame() {
  touches.forEach(touch => {
    const touchPoint = document.querySelector(`#touch-${touch.id}`);
    touchPoint.style.top = `${touch.y - 46}px`;
    touchPoint.style.left = `${touch.x - 46}px`;
  });
  
  requestAnimationFrame(onFrame);
}


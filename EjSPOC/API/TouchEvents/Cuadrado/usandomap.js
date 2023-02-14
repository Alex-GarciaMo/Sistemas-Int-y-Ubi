const touches = new Map();

function removeTouch(touchId) {
  touches.delete(touchId)

  const touchEl = document.querySelector(`#touch-${touchId}`);
  touchEl.remove();
}

function addTouch(touch) {
  touches.set(touch.identifier, { x: touch.clientX, y: touch.clientY });

  const touchEl = document.createElement("div");
  touchEl.id = `touch-${touch.identifier}`;
  touchEl.classList.add("touch-point");
  document.body.appendChild(touchEl);
}

document.addEventListener("touchstart", function(e) {
  addTouch(e.changedTouches[0]);
});

document.addEventListener("touchend", function(e) {
  removeTouch(e.changedTouches[0].identifier);
});

document.addEventListener("touchmove", function(e) {
  e.preventDefault();
  const changedTouches = e.changedTouches;
  for (let ct of changedTouches) {
    touches.set(ct.identifier, { x: ct.clientX, y: ct.clientY });
  }
}, { passive: false });



requestAnimationFrame(onFrame)

function onFrame() {
  touches.forEach((touch, id) => {
    const touchPoint = document.querySelector(`#touch-${id}`);
    touchPoint.style.top = `${touch.y - 46}px`;
    touchPoint.style.left = `${touch.x - 46}px`;
  });

  requestAnimationFrame(onFrame);
}
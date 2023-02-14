let startX = 0;
let endX = 0;
let startTime = 0;

const TIME_THRESHOLD = 200;
const SPACE_THRESHOLD = 100;

const items = document.querySelectorAll("li");

items.forEach(item => {
  item.addEventListener("touchstart", e => {
    e.preventDefault();
    e.target.classList.remove("swiped");
    startX = e.targetTouches[0].screenX;
    startTime = e.timeStamp;
  }, { passive: false });

  item.addEventListener("touchmove", e => {
    e.preventDefault();
    endX = e.changedTouches[0].screenX;
  }, { passive: false });

  item.addEventListener("touchend", e => {
    e.preventDefault();
    endTime = e.timeStamp;
    endX = e.changedTouches[0].screenX;
    if (endTime - startTime < TIME_THRESHOLD && endX - startX > SPACE_THRESHOLD) {
      handleSwipe(e.target);
    }
  });
});

function handleSwipe(element) {
  element.classList.add("swiped");

}
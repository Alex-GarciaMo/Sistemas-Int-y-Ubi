const button = document.querySelector("button");

function showNotification({ top = 0, right = 0, className, html }) {
    const notification = document.createElement("div");
    notification.className = "notification";

    if (className) {
        notification.classList.add(className);
    }

    notification.style.top = top + "px";
    notification.style.right = right + "px";

    notification.innerHTML = html;
    document.body.append(notification);

    setTimeout(() => notification.remove(), 2000);
}

button.addEventListener("click", function () {
    showNotification({
        top: 10,
        right: 10,
        html: 'Hello',
        className: "warning"
    });
});

var socket = io()
document.getElementById("send").addEventListener("click", (e) => {
    e.preventDefault()
    let message = document.getElementById("message")
    socket.emit('message', message.value);
    message.value = ""
    return false;
})

socket.on('message', function (msg) {
    let li = document.createElement("li")
    li.innerText = msg
    document.getElementById("show").appendChild(li);
});

var socket = io(),
    dataUSer = JSON.parse(localStorage.session)

socket.emit('dataUser', { dataUSeremail: dataUSer.email, name: dataUSer.realm, id: dataUSer.id });

socket.on('disconn', function (id) {
    document.getElementById(`user${id}`).querySelector(".st .-status-").classList.remove("-status-on-")
});

socket.on('status', function (ids) {
    for (let i = 0; i < ids.length; i++) {
        document.getElementById("lists").removeChild(document.getElementById(`user${ids[i]}`))
    }
});

socket.on('online', function (user) {
    console.log("entre")
    Object.keys(user).forEach(key => {
        if(!document.getElementById(`user${key}`)){
            let parent = document.getElementById("lists");
            let containerUser = document.createElement("div")
            let html = ""
            containerUser.classList.add("user")
            containerUser.setAttribute("id", `user${key}`)
            html += '<div class="box-img">'
            html += '<div class="align-img">'
            html += '<img src="http://fundaciontem.org/wp-content/uploads/2016/04/sinay-segun-veronica-1.jpg" alt="">'
            html += '</div>'
            html += '</div>'
            html += '<div class="cont-text">'
            html += `<div class="name">${user[key].name}</div>`
            html += '<div class="status">'
            html += 'I have money'
            html += '</div>'
            html += '</div>'
            html += '<div class="st">'
            html += `<div class="-status- -status-on-"></div>`
            html += '</div>'              
        
            containerUser.innerHTML = html
            parent.appendChild(containerUser)
        }else document.getElementById(`user${key}`).querySelector(".st .-status-").classList.add("-status-on-")
    })
    
});

// document.getElementById("send").addEventListener("click", (e) => {
//     e.preventDefault()
//     let message = document.getElementById("message")
//     socket.emit('message', message.value);
//     message.value = ""
//     return false;
// })

// socket.on('message', function (msg) {
//     let li = document.createElement("li")
//     li.innerText = msg
//     document.getElementById("show").appendChild(li);
// });
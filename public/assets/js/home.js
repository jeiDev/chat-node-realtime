
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
    Object.keys(user).forEach(key => {
        if (!document.getElementById(`user${key}`)) {
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
            html += `<div class="name"><div class="real-name">${user[key].name}</div> <div class="type-you">${dataUSer.id == key ? "(You)" : ""}</div></div>`
            html += '<div class="status">'
            html += 'I have money'
            html += '</div>'
            html += '</div>'
            html += '<div class="st">'
            html += `<div class="-status- -status-on-"></div>`
            html += '</div>'

            containerUser.innerHTML = html
            parent.appendChild(containerUser)
        } else document.getElementById(`user${key}`).querySelector(".st .-status-").classList.add("-status-on-")
    })

});
console.log()
socket.on('msg', function (msg) {
    let parent = document.getElementById("message")
    let div = document.createElement("div")
    let html = ""
    let exists = false
    div.classList.add("message")
    html += '<div class="image-message">'
    html += '<img src="http://fundaciontem.org/wp-content/uploads/2016/04/sinay-segun-veronica-1.jpg" alt="">'
    html += '</div>'
    html += '<div class="msg">'
    html += '<div class="box-arrow">'
    html += `<i class="${msg.id == dataUSer.id ? "fas fa-caret-right" : "fas fa-caret-left"}"></i>`
    html += '</div>'
    html += `<div class="message-user">${msg.id != dataUSer.id ? msg.name : "You"}</div>`

    for (let i = 0; i < emojis.length; i++) {
        if(msg.msg.indexOf(emojis[i].codes) !== -1){
            exists = true
            html += `<div class="show-message">${msg.msg.indexOf(emojis[i].codes) !== -1 ? msg.msg.replace(new RegExp(emojis[i].codes, 'g'), emojis[i].char) : msg.msg}</div>`
        } 
        if((i+1) == emojis.length && !exists){
            html += `<div class="show-message">${msg.msg}</div>`
        } 
    }
    exists = false

    if (emojis.length < 1) html += `<div class="show-message">${msg.msg}</div>`
    html += '</div>'

    if (msg.id === dataUSer.id) div.classList.add("you")
    else div.classList.add("other")
    div.innerHTML = html
    parent.appendChild(div)
});

socket.emit('getMessageId', { id: dataUSer.id });


socket.on('getMessage', function (msgs) {

    if (+msgs.id.id != dataUSer.id) return
    let messages = msgs.messages
    for (let i = 0; i < messages.length; i++) {
        let parent = document.getElementById("message")
        let div = document.createElement("div")
        let html = ""
        let exists = false

        div.classList.add("message")

        html += '<div class="image-message">'
        html += '<img src="http://fundaciontem.org/wp-content/uploads/2016/04/sinay-segun-veronica-1.jpg" alt="">'
        html += '</div>'
        html += '<div class="msg">'
        html += '<div class="box-arrow">'
        html += `<i class="${messages[i].id == dataUSer.id ? "fas fa-caret-right" : "fas fa-caret-left"}"></i>`
        html += '</div>'
        html += `<div class="message-user">${messages[i].id != dataUSer.id ? messages[i].name : "You"}</div>`



        for (let e = 0; e < emojis.length; e++) {
            if(messages[i].msg.indexOf(emojis[e].codes) !== -1){
                exists = true
                html += `<div class="show-message">${messages[i].msg.indexOf(emojis[e].codes) !== -1 ? messages[i].msg.replace(new RegExp(emojis[e].codes, 'g'), emojis[e].char) : messages[i].msg}</div>`
            } 
            if((e+1) == emojis.length && !exists) html += `<div class="show-message">${messages[i].msg}</div>`
        }   
        

        exists = false
    
        if (emojis.length < 1) html += `<div class="show-message">${messages[i].msg}</div>`

        html += '</div>'

        if (messages[i].id === dataUSer.id) div.classList.add("you")
        else div.classList.add("other")
        div.innerHTML = html
        parent.appendChild(div)

    }
});


let txtMessage = document.getElementById("txtMessage")
txtMessage.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        if (txtMessage.innerText.trim() == "") {
            setTimeout(() => {
                txtMessage.innerHTML = ""
            }, 1)

            return
        }
        socket.emit('message', { id: dataUSer.id, name: dataUSer.realm, msg: txtMessage.innerText });
        setTimeout(() => {
            txtMessage.innerHTML = ""
        }, 1)
    }
})
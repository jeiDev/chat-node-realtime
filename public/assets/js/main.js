var api = "http://192.168.8.104:3000/api/",
    token = localStorage.session ? JSON.parse(localStorage.session).token : null

/*
* @param {Object} send data in type Object example {type: "POST" (Required), url: "http://example.com"(Required), data: "Data to send" (Optional), token: "Ad2s5z5d6asdDSd5kdas6das5" (Optional)}
*/
function provider(data) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest()
        
        xhr.open(data.type, `${data.url}?${localStorage.session ? "access_token="+JSON.parse(localStorage.session).token : ""}`)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        xhr.onload = () => {
            if (xhr.status == 200) resolve(JSON.parse(xhr.responseText))
            else reject(JSON.parse(xhr.responseText))
        }

        xhr.send(`${data.data ? JSON.stringify(data.data) : null}`)
    })
}
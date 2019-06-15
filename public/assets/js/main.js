var api = "http://localhost:3000/api/"
var token = localStorage.session ? JSON.parse(localStorage.session).token : null
var dataUSer = JSON.parse(localStorage.session)
var imagenProfile = `${api}containers/${dataUSer.id}_users/download/perfil.png`;

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

function validateEmail(email) {
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)
}

function createMenu() {
  let header = document.querySelector("header")
  let logo = document.createElement("a")
  let imgLogo = document.createElement("img")
  let showMenuProfile = document.createElement("div")
  let boxImgProfile = document.createElement("div")
  let imgPerfil = document.createElement("img")
  let panelOptionUser = document.getElementById("panelOptionUser")
  let off = document.createElement("i")

  logo.setAttribute("class", "logo")
  logo.setAttribute("href", "/")
  imgLogo.setAttribute("src", "../assets/img/logo.png")
  showMenuProfile.setAttribute("id", "showMenuProfile")
  boxImgProfile.setAttribute("class", "box-img-profile image-profile-55")
  imgPerfil.setAttribute("src", imagenProfile)
  off.setAttribute("class", "fas fa-power-off")

  header.appendChild(logo)
  logo.appendChild(imgLogo)
  header.appendChild(showMenuProfile)
  showMenuProfile.appendChild(boxImgProfile)
  showMenuProfile.appendChild(off)
  boxImgProfile.appendChild(imgPerfil)

  imgPerfil.onerror = () => {
    imgPerfil.src = "../assets/img/not-image.png"
  }

  boxImgProfile.onclick = () => {
    panelOptionUser.style.right = 0
  }

  off.onclick = () => {
    delete localStorage.session
    location.href = "/login"
  }

}

function RandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getCaretPosition(editableDiv) {
  var caretPos = 0,
    sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}

function dataURItoBlob(dataURI) {
  let byteString = atob(dataURI.split(',')[1])
  let ab = new ArrayBuffer(byteString.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ab], {
    type: 'image/png'
  });
}


function postFormData(container, base64, name, cb) {
  let xhr = new XMLHttpRequest()
  let formData = new FormData()
  formData.append('fileToUpload', dataURItoBlob(base64), `${name}.png`)
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200)
        cb(xhr.responseText)
      else
        cb("Error petition")
    }
  }
  xhr.open("POST", `${api}/containers/${container}/upload?acces_token=${token}`)
  xhr.send(formData)

}

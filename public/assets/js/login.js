var alertLoginActive = false;

document.body.onload = init

function init() {
    /*********************
     * ANIMATION
     ********************/
    let contentMove = document.getElementById("contentMove"),
        contentRegister = document.getElementById("contentRegister"),
        contentLogin = document.getElementById("contentLogin"),
        onClickLogin = false;

    document.getElementById("showSignUp").addEventListener("click", () => {
        contentMove.classList.add("animation-left-minus")
        contentLogin.style.left = "0"
        contentRegister.style.left = "0"
        setTimeout(() => {
            contentMove.style.left = "40px"
            contentMove.classList.remove("animation-left-minus")
        }, 600)
    })

    document.getElementById("showLogin").addEventListener("click", () => {
        contentMove.classList.add("animation-left-plus")
        contentLogin.style.left = "-500px"
        contentRegister.style.left = "500px"
        setTimeout(() => {
            contentMove.style.left = "460px"
            contentMove.classList.remove("animation-left-plus")
        }, 600)
    })

    document.getElementById("login").addEventListener("click", () => {
        if (onClickLogin) return
        onClickLogin = true

        let email = document.getElementById("emailLogin").value,
            pass = document.getElementById("passLogin").value,
            barEmailLogin = document.getElementById("barEmailLogin"),
            barPassLogin = document.getElementById("barPassLogin"),
            emptyLogin = document.getElementById("emptyLogin");

        if (email == "") barEmailLogin.style.background = "hsla(0, 100%, 51%, 0.63)"
        else barEmailLogin.style.background = "hsla(214, 100%, 51%, 0.63)"

        if (pass == "") barPassLogin.style.background = "hsla(0, 100%, 51%, 0.63)"
        else barPassLogin.style.background = "hsla(214, 100%, 51%, 0.63)"


        if (email == "" || pass == "") {
            if (alertLoginActive) {
                onClickLogin = false
                return
            }
            emptyLogin.style.top = "0"

            setTimeout(() => {
                emptyLogin.style.top = "-40px"
                alertLoginActive = false
                onClickLogin = false
            }, 2000)
            return
        }

        login(email, pass)
        onClickLogin = false
    })
}

function login(email, pass) {
    let data = {
        type: "POST",
        data: {email, password: pass},
        url: `${api}Users/login`,
    }

    provider(data).then(res => {
        
    }).catch(err => {
        if(err.error.code == "LOGIN_FAILED"){
            if(!alertLoginActive){
                alertLoginActive = true
                let incorrectCredentials = document.getElementById("incorrectCredentials")
                incorrectCredentials.style.top = "0"

                setTimeout(() => {
                    incorrectCredentials.style.top = "-40px"
                    alertLoginActive = false
                }, 2000)
            }
        }
    })
}
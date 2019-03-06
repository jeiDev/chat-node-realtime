var alertActive = false,
    emptyLogin = document.getElementById("emptyLogin");

document.body.onload = init

function init() {
    /*********************
     * ANIMATION
     ********************/
    let contentMove = document.getElementById("contentMove"),
        contentRegister = document.getElementById("contentRegister"),
        contentLogin = document.getElementById("contentLogin"),
        onClick = false;

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
        if (onClick) return
        onClick = true

        let email = document.getElementById("emailLogin").value,
            pass = document.getElementById("passLogin").value,
            barEmailLogin = document.getElementById("barEmailLogin"),
            barPassLogin = document.getElementById("barPassLogin"),
            incorrectCredentials = document.getElementById("incorrectCredentials"),
            successLogin = document.getElementById("successLogin");

        if (email == "") barEmailLogin.style.background = "hsla(0, 100%, 51%, 0.63)"
        else barEmailLogin.style.background = "hsla(214, 100%, 51%, 0.63)"

        if (pass == "") barPassLogin.style.background = "hsla(0, 100%, 51%, 0.63)"
        else barPassLogin.style.background = "hsla(214, 100%, 51%, 0.63)"


        if (email == "" || pass == "") {
            if (alertActive) {
                onClick = false
                return
            }
            emptyLogin.style.top = "0"

            setTimeout(() => {
                emptyLogin.style.top = "-40px"
                alertActive = false
                onClick = false
            }, 2000)
            return
        }

        login(email, pass).then(res => {
            res.token = res.id
            localStorage.session = JSON.stringify(res)
            getDataUser(res.userId).then(r => {
                r.token = res.id
                localStorage.session = JSON.stringify(r)
                if (!alertActive) {
                    alertActive = true
                    successLogin.style.top = "0"

                    setTimeout(() => {
                        successLogin.style.top = "-40px"
                        alertActive = false
                        onClick = false
                    }, 2000)

                    setTimeout(() => {
                        location.href = "/"
                    }, 500)
                }
            }).catch(err => {

            })

        }).catch(err => {
            if (err == "LOGIN_FAILED") {
                if (!alertActive) {
                    alertActive = true
                    incorrectCredentials.style.top = "0"

                    setTimeout(() => {
                        incorrectCredentials.style.top = "-40px"
                        alertActive = false
                        onClick = false
                    }, 2000)

                }
            }
        })
    })

    document.getElementById("register").addEventListener("click", () => {
        if (onClick) return
        onClick = true

        let name = document.getElementById("name").value,
            email = document.getElementById("emailRegister").value,
            pass = document.getElementById("passRegister").value,
            barNameRegister = document.getElementById("barNameRegister"),
            barEmailRegister = document.getElementById("barEmailRegister"),
            barPassRegister = document.getElementById("barPassRegister"),
            emptyRegister = document.getElementById("emptyRegister"),
            incorrectCredentialsReg = document.getElementById("incorrectCredentialsReg"),
            successLoginReg = document.getElementById("successLoginReg"),
            useEmail = document.getElementById("useEmail");


        if (name == "") barNameRegister.style.background = "hsla(0, 100%, 51%, 0.63)"
        else barNameRegister.style.background = "hsla(214, 100%, 51%, 0.63)"

        if (email == "") barEmailRegister.style.background = "hsla(0, 100%, 51%, 0.63)"
        else barEmailRegister.style.background = "hsla(214, 100%, 51%, 0.63)"

        if (pass == "") barPassRegister.style.background = "hsla(0, 100%, 51%, 0.63)"
        else barPassRegister.style.background = "hsla(214, 100%, 51%, 0.63)"

        if (name == "" || email == "" || pass == "") {
            if (alertActive) {
                onClick = false
                return
            }
            emptyRegister.style.top = "0"

            setTimeout(() => {
                emptyRegister.style.top = "-40px"
                alertActive = false
                onClick = false
            }, 2000)
            return
        }

        register(name, email, pass).then(res => {
            // login(email, pass).then(res => {
            //     res.token = res.id
            //     res.id = res.userId
               
            //     if (!alertActive) {
            //         alertActive = true
            //         successLoginReg.style.top = "0"

            //         setTimeout(() => {
            //             successLoginReg.style.top = "-40px"
            //             alertActive = false
            //             onClick = false
            //         }, 2000)

            //         setTimeout(() => {
            //             location.href = "/"
            //         }, 500)
            //     }
            // }).catch(err => {
            //     if (err == "LOGIN_FAILED") {
            //         if (!alertActive) {
            //             alertActive = true
            //             incorrectCredentialsReg.style.top = "0"

            //             setTimeout(() => {
            //                 incorrectCredentialsReg.style.top = "-40px"
            //                 alertActive = false
            //                 onClick = false
            //             }, 2000)
            //         }
            //     }
            // })

            login(email, pass).then(res => {
                res.token = res.id
                localStorage.session = JSON.stringify(res)
                getDataUser(res.userId).then(r => {
                    r.token = res.id
                    localStorage.session = JSON.stringify(r)
                    if (!alertActive) {
                        alertActive = true
                        successLogin.style.top = "0"
    
                        setTimeout(() => {
                            successLogin.style.top = "-40px"
                            alertActive = false
                            onClick = false
                        }, 2000)
    
                        setTimeout(() => {
                            location.href = "/"
                        }, 500)
                    }
                }).catch(err => {
    
                })
    
            }).catch(err => {
                if (err == "LOGIN_FAILED") {
                    if (!alertActive) {
                        alertActive = true
                        incorrectCredentials.style.top = "0"
    
                        setTimeout(() => {
                            incorrectCredentials.style.top = "-40px"
                            alertActive = false
                            onClick = false
                        }, 2000)
    
                    }
                }
            })
        }).catch(err => {
            if (err.error.details.messages.email && err.error.details.messages.email == "Email already exists") {
                alertActive = true
                useEmail.style.top = "0"

                setTimeout(() => {
                    useEmail.style.top = "-40px"
                    alertActive = false
                    onClick = false
                }, 2000)
            }
        })


    })
}

function login(email, pass) {
    return new Promise(function (resolve, reject) {
        let data = {
            type: "POST",
            data: { email, password: pass },
            url: `${api}Users/login`,
        }

        provider(data).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err.error.code)
        })
    })
}


function register(name, email, pass) {
    return new Promise(function (resolve, reject) {
        let data = {
            type: "POST",
            data: { realm: name, email, password: pass },
            url: `${api}Users`,
        }

        provider(data).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })

}

function getDataUser(id) {
    return new Promise(function (resolve, reject) {
        provider({ type: "GET", url: `${api}Users/${id}` }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
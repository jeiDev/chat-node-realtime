document.body.onload = init

function init() {
    /*********************
     * ANIMATION
     ********************/
    let contentMove = document.getElementById("contentMove"),
        contentRegister = document.getElementById("contentRegister"),
        contentLogin = document.getElementById("contentLogin");

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
}
document.addEventListener("DOMContentLoaded", () => {

    function logUserOut(){
        localStorage.removeItem("username")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        document.querySelector("#signup-nav").innerHTML = "Sign Up/ Log In"
    }
    function checkLoggedIn (){
        if ((localStorage["accessToken"] !== null) && (localStorage["accessToken"] !== undefined)){
            document.querySelector("#signup-nav").innerHTML = "Log Out"
            
        }
    }
    checkLoggedIn()
    document.querySelector("#signup-nav").onclick = () => {
        if (document.querySelector("#signup-nav").innerHTML === "Log Out" ){
            logUserOut()
        }
    }


})
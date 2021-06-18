const database_url = "http://localhost:8081"

document.addEventListener('DOMContentLoaded', () => {
    let signup = true;
    
    document.querySelector("#signup-nav").innerHTML = "Sign Up/ Log In"

    function showForm () {
        if (signup === true){
            document.querySelector('#register-form').style.display = "block";
            document.querySelector('#login-form').style.display = "none";
            document.querySelector('#switchSignup').innerHTML = '<a href="#" id="goLogin">Already a User? Click here to login.</a>';
            
            const register_button = document.querySelector('#register-submit');
            register_button.onclick = () => {
                event.preventDefault()
                let url = database_url + '/register';
                let messageBox = document.querySelector("#message")
        
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                
        
                fetch(url, {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify({
                        "email": document.querySelector("#email-register").value,
                        "username": document.querySelector("#username-register").value,
                        "password": document.querySelector("#pass-register").value
                    }),
                    redirect: 'follow'
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                })

                document.querySelector("#email-register").value = ''
                document.querySelector("#username-register").value = ''
                document.querySelector("#pass-register").value = ''
            }

            document.querySelector('#goLogin').onclick = function() {
                event.preventDefault()
                signup = !signup
                console.log(signup)
                showForm()
            }
        } else {
            document.querySelector('#register-form').style.display = "none";
            document.querySelector('#login-form').style.display = "block";
            document.querySelector('#switchSignup').innerHTML = '<a href="#" id="goSignup">New here? Click here to Sign Up.</a>';
            document.querySelector('#goSignup').onclick = function() {
                event.preventDefault()
                signup = !signup
                console.log(signup)
                showForm()
            }
            const login_button = document.querySelector('#login-submit');
            login_button.onclick = () => {
                event.preventDefault()
                let url = database_url + '/login';
                let messageBox = document.querySelector("#message")
        
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                
                fetch(url, {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify({
                        "username": document.querySelector("#username-login").value,
                        "password": document.querySelector("#pass-login").value
                    }),
                    redirect: 'follow'
                })
                .then(async response => {
                    console.log("response received")
                    if (response.status < 400){
                        response = await response.json()
                        const accessToken = response.accessToken;
                        const refreshToken = response.refreshToken;
                        localStorage.setItem("accessToken", accessToken);
                        localStorage.setItem("refreshToken", refreshToken);
                        messageBox.innerHTML = `Successfully logged in. Please proceed to <a href="../pages/ask-question.html"> Ask a Question </a> or <a href="../pages/search-question.html"> Search for a question </a>`
                        document.querySelector('#switchSignup').innerHTML = ""
                        document.querySelector("#signup-nav").innerHTML = "Log Out"
                    }
                    return 
                })


                document.querySelector("#username-login").value = ''
                document.querySelector("#pass-login").value = ''
            }
        }
    }
    showForm()
    

})

//when accessToken expired error:
/*const refreshToken = getRefreshTokenFromLocalStorage()

axios
  .post('/refreshToken', {
    refreshToken
  })
  .then(response => {
    const newAccessToken = response.data.accessToken;
    storeAccessTokenInLocalStorage(newAccessToken);
  })
  .catch(error=> {
    alertFailed(error);
  });
  */

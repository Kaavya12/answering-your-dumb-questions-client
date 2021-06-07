const database_url = "https://answering-your-dumb-questions-servers.glitch.me/"

document.addEventListener('DOMContentLoaded', () => {
    let signup = true;
    function showForm () {
        if (signup === true){
            document.querySelector('#register-form').style.display = "block";
            document.querySelector('#login-form').style.display = "none";
            document.querySelector('#switchSignup').innerHTML = '<a href="#" id="goLogin">Already a User? Click here to login.</a>';
            
            const register_button = document.querySelector('#register-submit');
            register_button.onclick = () => {
        
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
                    if (result.error)
                        messageBox.innerHTML = result.error
                    else
                        messageBox.innerHTML = result.message
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
        
                let url = database_url + '/login';
                let messageBox = document.querySelector("#message")
        
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                
        
                fetch(url, {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify({
                        "username": document.querySelector("#username-register").value,
                        "password": document.querySelector("#pass-register").value
                    }),
                    redirect: 'follow'
                })
                .then(response => response.json())
                .then(result => {
                    if (result.error)
                        messageBox.innerHTML = result.error
                    else
                        messageBox.innerHTML = result.message
                })


                document.querySelector("#username-register").value = ''
                document.querySelector("#pass-register").value = ''
            }
        }
    }
    
    
    showForm()

    

})
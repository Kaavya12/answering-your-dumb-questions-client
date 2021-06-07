const database_url = "http://localhost:8081"

document.addEventListener('DOMContentLoaded', () => {
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
                "email": document.querySelector("#email-input").value,
                "username": document.querySelector("#username-input").value,
                "password": document.querySelector("#pass-input").value
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
    }
})
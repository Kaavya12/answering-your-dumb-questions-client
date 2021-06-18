const database_url = "http://localhost:8081"
document.addEventListener('DOMContentLoaded', () => {

    function authorize() {
        var myHeaders = new Headers();

        myHeaders.append("Authorization", localStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        console.log(database_url)
        fetch(database_url + "/getUser", requestOptions)
            .then(response => {
                console.log(response)
                if (response.status > 400) {
                    document.querySelector("#main").innerHTML = "<h1>Please login to ask a question</h1>"
                    document.querySelector("#signup-nav").innerHTML = "Sign Up/ Log In"
                    return "Unauthorized"
                }
                else {
                    return response.text()
                }
            })
            .then(result => {
                if (result !== "Unauthorized") {
                    if (result === "jwt expired") {
                        myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");

                        raw = JSON.stringify({
                            "refreshToken": localStorage.getItem("refreshToken")
                        });

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };

                        fetch(database_url + "/auth/token", requestOptions)
                            .then(response => response.json())
                            .then(result => { localStorage["accessToken"] = result.newAccessToken; location.reload() })
                            .catch(error => console.log('error', error));

                    }
                    else {
                        result = JSON.parse(result)
                        localStorage.setItem("username", result.userInfo.userId)
                        const username = localStorage["username"]
                        document.querySelector("#question-user").innerHTML = `Ask your question here ${username}!`
                    }
                }


                console.log(result)
            })
    }

    authorize()

    var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
        removeItemButton: true,
        maxItemCount: 5,
        searchResultLimit: 5,
        renderChoiceLimit: 6
    });

    document.querySelector("#ask-question-form").onsubmit = () => {
        event.preventDefault()
        console.log("Submit Buttton Clicked!")
    }


})
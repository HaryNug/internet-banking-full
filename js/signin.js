document.getElementById("login").addEventListener("click", function (event) { event.preventDefault() });
document.getElementById("login").addEventListener("click", login)

function login() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let loginStatus = document.getElementById("login-status")
    // console.log(typeof username)
    // console.log(typeof password)
    if (username==''||password==''){
        loginStatus.innerHTML = 'you must complete sign in form!'
    } else{
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic " + btoa(username + ":" + password));
    
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };
    
        fetch("http://127.0.0.1:5000/login", requestOptions)
            .then(response => {
            // console.log(response)
                if (response.ok) {
                    return response.json()
                } else {
                    throw response
                }
            })
            
            .then(result => {
                localStorage.setItem('dataUser', JSON.stringify(result))
                if (result.type == "admin") {
                    // alert("anda adalah admin")
                    window.location.href = "admin.html"
                }
                else {
                    // alert("anda adalah member")
                    window.location.href = "home.html"
                }
    
            })
            .catch(error => {
                loginStatus.style.color = 'red'
                if (error.status == 401) {
                    loginStatus.innerHTML = 'password incorect'
                } else {
                    loginStatus.innerHTML = 'user not found'
    
                }
                console.error(error)
            });
    }
}

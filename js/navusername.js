document.addEventListener("DOMContentLoaded", function(event) { 
    setusername()
});

function setusername() {
    let dataUser = JSON.parse(localStorage.getItem('dataUser'))
    document.getElementById('nav-username').innerHTML = dataUser.name
}
function logout() {
    delete localStorage.dataUser;
}
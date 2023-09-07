document.addEventListener("DOMContentLoaded", function(event) { 
    getbranch()
});

document.getElementById("branchname").addEventListener("change", function(){
    showId()
})
document.getElementById("create").addEventListener("click", function (event) { event.preventDefault() });
document.getElementById("create").addEventListener("click", create)

function create() {
    let branchid = showId()
    let name = document.getElementById("name").value
    let telp = document.getElementById("telp").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let createStatus = document.getElementById("create-status")

    if (branchid ===''||name ===''||telp ===''||email ===''||password ===''){
        createStatus.innerHTML = 'you must complete create admin form!'
    } else {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
            "branch_id": branchid,
            "name": name,
            "telp": telp,
            "email": email,
            "password": password
        });
    
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
    
        fetch("http://127.0.0.1:5000/admin", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw response
                }
            })
            .then(result => {
                if (result.status == "success") {
                    createStatus.innerHTML = ''
                    swal({
                        title: "Success!",
                        text: "New Admin Successfully Created!",
                        icon: "success",
                    })
                    .then(result=> {
                        window.location.href = "admin.html"
                    } )
                }
            })
            .catch(error => {
                error.json()
                    .then(errorjson=> {
                        if (errorjson.error == 'Telp exists') {
                            createStatus.innerHTML = 'Telp already exists'
                        } else if (errorjson.error == 'email exists') {
                            createStatus.innerHTML = 'email already exists'
            
                        }
                        })
                    console.error(error)
            });
    }
}

function getbranch (){
    let raw = "";
    const requestOptions = {
        method: 'POST',
        body: raw
      };
      console.log()
      fetch("http://127.0.0.1:5000/branch", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        })
        .then(result => {
            const branchList = document.querySelector("#branchname")
            branchList.innerHTML = ""

            result.result.forEach((element) => {
                const branch = `
                <option value="${element.id}">${element.name}</option>
                `
                branchList.insertAdjacentHTML('beforeend', branch)
            });

        })
        .catch(error => console.error('error', error));
}

function showId() {
    const id = document.getElementById("branchname").value
    return id
}
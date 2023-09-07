document.addEventListener("DOMContentLoaded", function(event) { 
    getbranch()
});

document.getElementById("branchname").addEventListener("change", function(){
    showId()
})
document.getElementById("startnow").addEventListener("click", function (event) { event.preventDefault() });
document.getElementById("startnow").addEventListener("click", startnow)

function startnow() {
    let branchid = showId()
    let fullname = document.getElementById("fullname").value
    let telp = document.getElementById("telp").value
    let emailsignup = document.getElementById("emailsignup").value
    let passwordsignup = document.getElementById("passwordsignup").value
    let credit = 50000
    let signupStatus = document.getElementById("signup-status")
    // console.log(branchid)
    if (branchid==''||fullname==''||telp==''||emailsignup==''||passwordsignup==''){
        signupStatus.innerHTML = 'you must complete sign up form!'
    } else {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "branch_id": branchid,
            "name": fullname,
            "telp": telp,
            "email": emailsignup,
            "password": passwordsignup,
            "credit": credit
        });
    
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
    
        fetch("http://127.0.0.1:5000/member", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw response
                }
            })
            .then(result => {
                if (result.status == "success") {
                    signupStatus.innerHTML = ''
                    swal({
                        title: "Congratulation!",
                        text: "Now you can sign in!",
                        icon: "success",
                    });
                    
                }
            })
            .catch(error => {
                error.json()
                .then(errorjson=> {
                    if (errorjson.error == 'Telp exists') {
                        signupStatus.innerHTML = 'Telp already exists'
                    } else if (errorjson.error == 'email exists') {
                        signupStatus.innerHTML = 'email already exists'
        
                    }
                    })
                console.error(error)
            });
    }
}

function getbranch (){
    let raw = ""
    const requestOptions = {
        method: 'POST',
        body : raw
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
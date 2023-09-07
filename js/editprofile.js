function displayuserdata() {
    const datauser = JSON.parse(localStorage.getItem("dataUser"))
    let email = document.getElementById("email")
    let telp = document.getElementById("telp")
    telp.value = datauser.telp
    email.value = datauser.email
}

document.addEventListener("DOMContentLoaded", function (event) {
    displayuserdata()
});

document.getElementById("change").addEventListener("click", function (event) { event.preventDefault() });
document.getElementById("change").addEventListener("click", editprofile)

function editprofile() {
    let dataUser = JSON.parse(localStorage.getItem('dataUser'))
    let userid = dataUser.id
    let email = document.getElementById("email").value
    let telp = document.getElementById("telp").value
    // let password = document.getElementById("password").value
    let editstatus = document.getElementById("edit-status")

    if (email === "" && telp === "") {
        editstatus.innerHTML = 'form cannot be blank'
    } else {
        editstatus.innerHTML = ""
        let rawdata = {
            user_id: userid,
            email: email,
            telp: telp
        }
        Object.keys(rawdata).forEach(key => {
            if (rawdata[key] === "") {
                delete rawdata[key]
            }
        })
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(rawdata);
        // console.log("raw", rawdata)
        const requestOptions = {
            method: 'PUT',
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
                    swal({
                        title: "Success!",
                        icon: "success",
                    })
                    .then(result => {
                        dataUser = {
                            ...dataUser,
                            email : email, 
                            telp : telp
                        }
                        localStorage.setItem("dataUser", JSON.stringify(dataUser))
                        window.location.reload()
                    })
                }
            })
            .catch(error => console.log('error', error));
    }
}
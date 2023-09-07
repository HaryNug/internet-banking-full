document.getElementById("newaccount").addEventListener("click", function (event) { event.preventDefault() });
document.getElementById("newaccount").addEventListener("click", newaccount)

function newaccount() {
    let email = document.getElementById("email").value
    let nominal = document.getElementById("nominal").value
    let dataUser = JSON.parse(localStorage.getItem('dataUser'))
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email" : email,
        "branch_id": dataUser.branch,
        "credit": parseInt(nominal)
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch("http://127.0.0.1:5000/newaccount", requestOptions)
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
                    title: "success!",
                    icon: "success",
                })
                .then(result=> {
                    window.location.href = "accountmanagement.html"
                } )
            }
        })
        .catch(error => {
            error.json()
            .then(errorjson=> {
                if (errorjson.error == 'not enough') {
                    swal({
                        title: "Failure!",
                        text: "deposit is not enough",
                        icon: "error",
                    });
                } 
                })
            console.error(error)
        });
}
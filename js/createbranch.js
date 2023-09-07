document.getElementById("create").addEventListener("click", function (event) { event.preventDefault() });
document.getElementById("create").addEventListener("click", create)

function create() {
    let branchName = document.getElementById("branchname").value
    let address = document.getElementById("address").value
    let createStatus = document.getElementById("create-status")

    if (branchName === '' || address === '') {
        createStatus.innerHTML = 'you must complete create branch form!'
    } else {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "name": branchName,
            "address": address
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        fetch("http://127.0.0.1:5000/branchs", requestOptions)
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
                        title: "Succes!",
                        text: "New Branch Successfully Created",
                        icon: "success"
                    })
                        .then(result => {
                            window.location.href = "admin.html"
                        })

                }
            })
            .catch(error => console.log('error', error));

    }

}

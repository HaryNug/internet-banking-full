document.getElementById("activate").addEventListener("click", function (event) { event.preventDefault() });
document.getElementById("activate").addEventListener("click", activate)

function activate() {
    let accountid = document.getElementById("accountid").value
    let deposit = document.getElementById("deposit").value

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "account_id": accountid,
        "credit" : parseInt(deposit)
    });

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
    };

    fetch("http://127.0.0.1:5000/active", requestOptions)
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
                    icon: "success"
                })
                .then(result=> {
                    window.location.href = "accountmanagement.html"
                } )
                
            }
        })
        .catch(error => console.log('error', error));
}
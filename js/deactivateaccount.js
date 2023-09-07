document.getElementById("deactivate").addEventListener("click", function (event) { event.preventDefault() });
document.getElementById("deactivate").addEventListener("click", deactivate)

function deactivate() {
    let accountid = document.getElementById("accountid").value

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "account_id": accountid
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        
    };

    fetch("http://127.0.0.1:5000/nonactive", requestOptions)
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
                .then(result=> {
                    window.location.href = "accountmanagement.html"
                } )
            }
        })
        .catch(error => console.log('error', error));
}

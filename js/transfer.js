document.addEventListener("DOMContentLoaded", function (event) {
    getaccountdata()
});

document.getElementById("accountid").addEventListener("change", function () {
    showId()
})

document.getElementById("transfer").addEventListener("click", function (event) { event.preventDefault() });
document.getElementById("transfer").addEventListener("click", transfer)

function transfer() {
    let accountid = showId()
    let receiverid = document.getElementById("receiverid").value
    let nominal = document.getElementById("nominal").value
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "account_id" : accountid,
        "receiver_id": receiverid,
        "transfer": parseInt(nominal)
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch(`http://127.0.0.1:5000/transfer`, requestOptions)
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
                });
            }
        })
        .catch(error => {
            error.json()
            .then(errorjson => {
                if (errorjson.error == 'not user') {
                    swal({
                        title: "Failure!",
                        text: "receiver is not exists",
                        icon: "error",
                    });
                } else if (errorjson.error == 'not enough'){
                    swal({
                        title: "Failure!",
                        text: "your saldo is not enough!",
                        icon: "error",
                    });
                } else if (errorjson.error == 'receiver nonactive'){
                    swal({
                        title: "Failure!",
                        text: "receiver is nonactive!",
                        icon: "error",
                    });
                } else if (errorjson.error == 'receiver dormant'){
                    swal({
                        title: "Failure!",
                        text: "receiver in dormant periode!",
                        icon: "error",
                    });
                }
            })
            console.error(error)
        });
}

function getaccountdata() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "uid": JSON.parse(localStorage.getItem('dataUser')).id
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch("http://127.0.0.1:5000/account", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        })
        .then(result => {
            const accountlist = document.querySelector("#accountid")
            accountlist.innerHTML = ""
            
            const accounts = JSON.parse(localStorage.getItem('dataUser')).account 
            const filteredstatus = accounts.filter(account =>account.status === 'active')

            filteredstatus.forEach((element) => {
                const account = `
                <option value="${element.account_id}">${element.account_id}</option>
                `
                accountlist.insertAdjacentHTML('beforeend', account)
            });
        })
        .catch(error => console.error('error', error));
}

function showId() {
    const id = document.getElementById("accountid").value
    return id
}

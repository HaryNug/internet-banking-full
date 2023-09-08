document.addEventListener("DOMContentLoaded", function (event) {
    getaccountdata()
});

function getaccountdata() {
    let branchID = JSON.parse(localStorage.getItem('dataUser')).branch
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "branch_id": branchID
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch("http://127.0.0.1:5000/accounts", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        })
        .then(result => {
            const accountlist = document.querySelector("#accountManagement")
            accountlist.innerHTML = ""
            localStorage.setItem("accounts",JSON.stringify(result.result))
            
            result.result.forEach(element => {
                // console.log(element.account_id)
                let status = element.status
                let row
                if (status==="dormant"||status==="nonactive") {
                    row = `<a id="activate" onclick="setidmodal(event, ${element.account_id})" data-toggle="modal" data-target="#activateModal" class="btn btn-primary btn-icon-split">
                    <span class="text">Activate</span>
                    </a>`
                }else{
                    row = `<a id="deactivate" onclick="deactivate(event, ${element.account_id})" class="btn btn-primary btn-icon-split">
                        <span class="text">Deactivate</span>
                        </a>`
                }
                const accountData =
                `
                    <tr>
                        <td>${element.name}</td>
                        <td>${element.account_id}</td>
                        <td>${status}</td>
                        <td>${element.saldo}</td>
                        <td>${row}</td>
                    <tr>
                `
            accountlist.insertAdjacentHTML('beforeend',accountData)
            });
            
        })
        .catch(error => console.log('error', error));
}

function setidmodal(event, id){
    event.preventDefault()
    document.getElementById("activateModal").setAttribute("data-id",id)    
}
function activate(event) {
    event.preventDefault()
    const accountid = document.getElementById("activateModal").getAttribute("data-id")   
    let deposit = document.getElementById("nominal").value

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "account_id": parseInt(accountid),
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
                    window.location.reload()
                } )
                
            }
        })
        .catch(error => console.log('error', error));
}

function deactivate(event, id){
    event.preventDefault()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "account_id": id
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
                    window.location.reload()
                } )
            }
        })
        .catch(error => console.log('error', error));
}
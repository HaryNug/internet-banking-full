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
        
            result.result.forEach(element => {
                const accountData =`
                    <tr>
                        <td>${element.name}</td>
                        <td>${element.account_id}</td>
                        <td>${element.status}</td>
                        <td>${element.saldo}</td>
                    <tr>
                `
            accountlist.insertAdjacentHTML('beforeend',accountData)
            });
        })
        .catch(error => console.log('error', error));
}
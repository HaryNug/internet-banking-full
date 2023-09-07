document.getElementById("changebranch").addEventListener("click", function (event) { event.preventDefault() });
document.getElementById("changebranch").addEventListener("click", changebranch)

function changebranch() {
    let accountid = document.getElementById("accountid").value
    let branchid = JSON.parse(localStorage.getItem('dataUser')).branch
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "account_id": accountid,
        "branch_id": branchid
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch("http://127.0.0.1:5000/editaccount", requestOptions)
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
        .catch(error => console.error('error', error));
}

function getaccountdata() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "uid": JSON.parse(localStorage.getItem('dataUser')).id
    });
    // console.log(JSON.parse(localStorage.getItem('dataUser')).account)
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

function getaccountid() {
    const id = document.getElementById("accountid").value
    return id
}

function getbranch (accountid){
    const requestOptions = {
        method: 'GET',
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

            
            const accountlist = JSON.parse(localStorage.getItem('dataUser')).account
            const account = accountlist.find(acc => acc.account_id === accountid)
            const filteredBranch = result.result.filter(branch => branch.id !== account.branch_id )
            filteredBranch.forEach((element) => {

                const branch = `
                <option value="${element.id}">${element.name}</option>
                `
                branchList.insertAdjacentHTML('beforeend', branch)
            });

        })
        .catch(error => console.error('error', error));
}

function showBranch() {
    const id = document.getElementById("branchname").value
    return id
}
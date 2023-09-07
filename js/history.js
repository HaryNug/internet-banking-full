document.addEventListener("DOMContentLoaded", function (event) {
    getaccountdata()
}) 
document.getElementById("accountid").addEventListener("change", function () {
    showId()
})
document.getElementById("confirm").addEventListener("click", function (event) { event.preventDefault() });
document.getElementById("confirm").addEventListener("click", gethistory)

function gethistory() {
    let accountid = showId()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "account_id": accountid
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch("http://127.0.0.1:5000/history", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        })
        .then(result => {
            const historylist = document.querySelector("#history")
            historylist.innerHTML = ""
            
            let Rp = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumSignificantDigits: 1
            });
            
            result.result.forEach((element) => {
                let credit = element.credit
                let debit = element.debit
                let receiver =element.receiver_id
                let rname = element.receiver_name
                let sender = element.sender_id
                let sname = element.sender_name

                if (credit == null){
                    credit = "-"
                } else {
                    credit = Rp.format(credit)
                }

                if (debit == null){
                    debit = "-"
                } else {
                    debit = Rp.format(debit)
                }

                if (receiver == null){
                    receiver = "-"
                } else {
                    receiver
                }

                if (rname == null){
                    rname = "-"
                } else {
                    rname
                }

                if (sender == null){
                    sender = "-"
                } else {
                    sender 
                }

                if (sname == null){
                    sname = "-"
                } else {
                    sname
                }
                const accountactivity = `
                    <tr>
                        <td>${element.activity_date.replace("GMT","")}</td>
                        <td>${credit}</td>
                        <td>${debit}</td>
                        <td>${receiver}</td>
                        <td>${rname}</td>
                        <td>${sender}</td>
                        <td>${sname}</td>
                        <td>${Rp.format(element.saldo)}</td>
                    </tr>
            `
            historylist.insertAdjacentHTML('beforeend',accountactivity)
            })
        })
        .catch(error => console.log('error', error));
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

            result.hasil.forEach((element) => {
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
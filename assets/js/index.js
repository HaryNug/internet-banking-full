document.addEventListener("DOMContentLoaded", function(event) { 
    setusername()
    getaccountdata()
});

function setusername() {
    let dataUser = JSON.parse(localStorage.getItem('dataUser'))
    document.getElementById('nav-username').innerHTML = dataUser.name
}

function logout() {
    delete localStorage.dataUser;
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
            const cardList = document.querySelector("#accountDetailCard")
            cardList.innerHTML = ""

            let Rp = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumSignificantDigits: 1
            });

            result.hasil.forEach((element) => {
                const card = `
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-success shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            ${element.name.replace("Saku Bank : ", "")}
                                        </div>

                                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        ID : ${element.account_id}
                                        </div>

                                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                                            ${Rp.format(element.saldo)}
                                        </div>

                                        <div class="text-xs font-weight-bold text-uppercase mb-1">
                                            ${element.status}
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                `

                cardList.insertAdjacentHTML('beforeend', card)
                console.log("element",element)
            });
        })
        .catch(error => console.error('error', error));
}

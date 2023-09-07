document.addEventListener("DOMContentLoaded", function (event) {
    getdormantareport()
})

function getdormantareport() {
    let branchid = JSON.parse(localStorage.getItem('dataUser')).branch
    console.log(JSON.parse(localStorage.getItem('dataUser')))
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic Og==");

    const raw = JSON.stringify({
        "branch_id": branchid
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch("http://127.0.0.1:5000/dormantreport", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        })
        .then(result => {
            const dormantreportlist = document.querySelector("#dormantreport")
            dormantreportlist.innerHTML = ""

            result.result.forEach(element => {
                let dormantend = element.dormant_period.end_date
                if(dormantend == null) {
                    dormantend = "-"
                } else {
                    dormantend = dormantend.slice(0,25)
                }

                const dormantreport = `
                <tr>
                <td>${element.account_id}</td>
                <td>${element.user_id}</td>
                <td>${element.status}</td>
                <td>${element.last_activity.slice(0,25)}</td>
                <td>${element.dormant_period.start_date.slice(0,25)}</td>
                <td>${dormantend}</td>
            </tr>
            `
            dormantreportlist.insertAdjacentHTML('beforeend',dormantreport)    
            });
        })
        .catch(error => console.log('error', error));
}
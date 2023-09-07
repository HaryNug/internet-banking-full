document.getElementById("confirm").addEventListener("click", function (event) { event.preventDefault() });
document.getElementById("confirm").addEventListener("click", getbranchreport)

function getbranchreport() {
    let branchid = JSON.parse(localStorage.getItem('dataUser')).branch
    let startdate = document.getElementById("startdate").value
    let enddate = document.getElementById('enddate').value
    let reportStatus = document.getElementById('report-status')
 
    if (startdate ==="" || enddate ==="") {
        reportStatus.innerHTML = "please, complete all field(s)"
    } else {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
    
        const raw = JSON.stringify({
            "branch_id": branchid,
            "start_date": startdate,
            "end_date": enddate
        });
    
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
    
        fetch("http://127.0.0.1:5000/branchreport", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw response
                }
            })
            .then(result => {
                reportStatus.innerHTML = ""

                let Rp = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumSignificantDigits: 1
                });

                const branchreportdata = result.result
                document.getElementById("totalaccount").innerHTML= branchreportdata.total_account
                document.getElementById("totalbalance").innerHTML= Rp.format(branchreportdata.total_balance)
                document.getElementById("totalcredit").innerHTML= Rp.format(branchreportdata.total_credit)
                document.getElementById("totaldebit").innerHTML= Rp.format(branchreportdata.total_debit)
                document.getElementById("totaluser").innerHTML= branchreportdata.total_user
    
                     
            })
    
            .catch(error => console.log('error', error));
    }
}
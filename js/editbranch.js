const urlparams = new URLSearchParams(window.location.search)
const bid = urlparams.get("bid")

document.addEventListener("DOMContentLoaded", function(event) { 

    let branches = JSON.parse(localStorage.getItem("branches"))
    // console.log(typeof branches, branches)
    // let branch = branches.find(br=>br.id==bid)
    let branch = branches.find(br => br.id === bid)
    document.getElementById("changename").value = branch.name
    document.getElementById("address").value = branch.address
});

// document.getElementById("branchname").addEventListener("change", function(){
//     showId()
// })
// document.getElementById("changename").addEventListener("change", function(){
//     showname()
// })
// document.getElementById("address").addEventListener("change", function(){
//     showaddress()
// })

document.getElementById("confirm").addEventListener("click", 
    function(event) {
        event.preventDefault()
        
        // let databranch = JSON.parse(localStorage.getItem(""))
        let branchId = bid
        let branchName = document.getElementById("changename").value
        let address = document.getElementById("address").value
        let editstatus = document.getElementById("edit-status")
        
        if (branchName === "" && address === "") {
            editstatus.innerHTML = 'form cannot be blank' 
        } else {
            editstatus.innerHTML = ''
            let rawdata = {
                branch_id: branchId,
                name: branchName,
                address: address
            }
            console.log(rawdata)
            Object.keys(rawdata).forEach(key=>{
                if(rawdata[key] === "") {
                    delete rawdata[key]
                }
            })

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        
            const raw = JSON.stringify(rawdata);
        
            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
            };
        
            fetch("http://127.0.0.1:5000/branch", requestOptions)
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
                            title: "success!",
                            icon: "success",
                        })
                        .then(result=> {

                            window.location.href = "admin.html"
                        } )
                    }
                })
                .catch(error => console.log('error', error));
        }
    }
)

// function getbranch(){
//     let raw = ""
//     const requestOptions = {
//         method: 'POST',
//         body: raw
//       };
//       console.log()
//       fetch("http://127.0.0.1:5000/branch", requestOptions)
//         .then(response => {
//             if (response.ok) {
//                 return response.json()
//             } else {
//                 throw response
//             }
//         })
//         .then(result => {
//             const branchList = document.querySelector("#branchname")
//             branchList.innerHTML = "<option id='displaybranch' selected disabled>Select Branch</option>"
//             localStorage.setItem("branches",JSON.stringify(result.result))
//             result.result.forEach((element) => {
//                 const branch = `
                
//                 <option value="${element.id}">${element.name}</option>
//                 `
//                 branchList.insertAdjacentHTML('beforeend', branch)
//             });

//         })
//         .catch(error => console.error('error', error));
// }

// function showId() {
//     const id = document.getElementById("branchname").value
//     let branch = JSON.parse(localStorage.getItem("branches")).find(br=>br.id==id)
//     document.getElementById("changename").value = branch.name
//     document.getElementById("address").value = branch.address

//     return id
// }

// function showname () {
//     const name = document.getElementById("changename").value
//     // console.log(name)
//     return name
// }

// function showaddress () {
//     const address = document.getElementById("address").value
//     // console.log(address)
//     return address
// }
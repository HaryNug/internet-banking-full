document.addEventListener("DOMContentLoaded", function (event) {
    getbranchdata()
});

function getbranchdata() {

    let raw = "";

    const requestOptions = {
        method: 'POST',
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
            const branchlist = document.querySelector("#branchManagement")
            branchlist.innerHTML = ""
            localStorage.setItem("branches",JSON.stringify(result.result))

            result.result.forEach(element => {
                const branchData =`
                    <tr>
                        <td>${element.name}</td>
                        <td>${element.address}</td>
                        <td><a id="edit" onclick="editbranch(event, ${element.id})" class="btn btn-primary btn-icon-split">
                        <span class="text">Edit</span>
                    </a></td>
                    <tr>
                `
            branchlist.insertAdjacentHTML('beforeend',branchData)
            });
        })
        .catch(error => console.log('error', error));
}

function editbranch(event, id) {
    event.preventDefault()
    window.location.href="editbranch.html?bid="+id
}
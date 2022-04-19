warning = document.getElementById('available-username');


async function verifyName(){
    console.log("yo");
    


    let name = document.getElementById('newUsername').value;

    if (name==""){
        warning.style.color= "black";
        warning.innerText = "Choose a cool username like Jack or HacKeRmAn_Il1lI_eg8gO0o";
    }
    else{

        const AA = await fetch(`/api/user/check/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        console.log(Response);
        console.log(AA);
        console.log(AA.status);
        if (AA.status==200 ) {
            console.log("200");
            warning.style.color= "green";
            warning.innerText = "username available";
        } else {//status == 298
            console.log("298");
            warning.style.color= "red";
            warning.innerText = "username not available";
        }
    }
    return;

}

async function newFormHandler(event){
    event.preventDefault();
    const name = document.querySelector('#newUsername').value;
    const password = document.querySelector('#newPassword').value;
    const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({
            name,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to add new user')
    }
}

document.querySelector('#signupForm').addEventListener('submit', newFormHandler);
document.querySelector('#newUsername').addEventListener('input',verifyName);
//login function
async function login(event){
    event.preventDefault();
    const name = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const response = await fetch('/api/user/login', {
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
        document.location.replace('/dash');
    } else {
        alert('Login problemerino')
    }
}

//logout function
async function logout(){
    const response = await fetch('/api/user/logout', {
        method: 'POST'
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Logout problemerino')
    }
}

//add event listeners if triggers present
if(document.querySelector('#loginForm'))document.querySelector('#loginForm').addEventListener('submit', login);
if(document.querySelector('#logoutButton'))document.querySelector('#logoutButton').addEventListener('click', logout);
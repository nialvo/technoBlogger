async function newComment(){
    const content = document.querySelector('#content').value;
    const id = document.querySelector('#newCOmment').value;
    const response = await fetch(`/api/create/comment/${id}`, {
        method: 'POST',
        body: JSON.stringify({
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        console.log(response);
        document.location.replace(`/post/${id}`);
    } else {
        alert('Fail');
    }
}

document.querySelector('#submitButton').addEventListener('click', newComment);
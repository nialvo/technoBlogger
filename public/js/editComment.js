async function editComment(){
    const content = document.querySelector('#content').value;
    const id = document.querySelector('#newComment').value;
    const postid = document.querySelector('#onPost').value;
    const response = await fetch(`/api/edit/comment/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        document.location.replace(`/post/${postid}`);
    } else {
        alert('Fail');
    }
}

async function deleteComment(){
    const id = document.querySelector('#newComment').value;
    const postid = document.querySelector('#onPost').value;
    const response = await fetch(`/api/edit/comment/delete/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.replace(`/post/${postid}`);
    } else {
        alert('Fail');
    }
}

document.querySelector('#editComment').addEventListener('click', editComment);

document.querySelector('#deleteComment').addEventListener('click', deleteComment);


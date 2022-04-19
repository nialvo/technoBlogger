async function newPost(event){
    const commentNum = 0;
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const tag = document.querySelector('#tag').value;
    const response = await fetch('/api/create/post/', {
        method: 'POST',
        body: JSON.stringify({
            title,
            tag,
            content,
            commentNum
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        console.log(response);
        document.location.replace('/dash');
    } else {
        alert('Failed to create post');
    }
}

document.querySelector('#submitButton').addEventListener('click', newPost);
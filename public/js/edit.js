async function edit(val){
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const tag = document.querySelector('#tag').value;
    //const val = document.querySelector('#postNum').value;
    console.log("yayayayayoooo");
    const response = await fetch(`/api/edit/post/${val}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content,
            tag
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        document.location.replace('/dash');
    } else {
        alert('Fail');
    }
}

async function deletePost(val){
    //const val = document.querySelector('#postNum').value;
    const response = await fetch(`/api/delete/post/${val}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.replace('/dash');
    } else {
        alert('Fail');
    }
}

/*
document.querySelector('#editPost').addEventListener('click',edit);
    
document.querySelector('#deletePost').addEventListener('click',deletePost);
*/
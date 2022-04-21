async function editComment(val,postid){
    const content = document.querySelector('#content').value;
    const response = await fetch(`/api/edit/comment/${val}`, {
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

async function deleteComment(val,postid){
    const response = await fetch(`/api/delete/comment/${val}/${postid}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.replace(`/post/${postid}`);
    } else {
        alert('Fail');
    }
}

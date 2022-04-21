async function newComment(val){
    const content = document.querySelector('#content').value;
    const response = await fetch(`/api/create/comment/${val}`, {
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
        document.location.replace(`/post/${val}`);
    } else {
        alert('Fail');
    }
}


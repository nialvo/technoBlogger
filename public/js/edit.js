async function edit(){
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const tag = document.querySelector('#tag').value;
    
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

async function deletePost(){
    
    const response = await fetch(`/api/edit/post/delete/${val}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.replace('/dash');
    } else {
        alert('Fail');
    }
}

window.addEventListener('load', function() {
    const pid = document.getElementById('postNum');
    const val = pid.innerText;
    document.querySelector('#editPost').addEventListener('click', ()=>{edit(val)});
    
    document.querySelector('#deletePost').addEventListener('click', ()=>{deletePost(val)});
    
})

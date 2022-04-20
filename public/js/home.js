
async function newPost (event){
    event.preventDefault();
    document.location.replace('/new');
}

if(document.querySelector('#newPost')){
    document.querySelector('#newPost').addEventListener('click', newPost);
}



async function newPost (event){
    event.preventDefault();
    document.location.replace('/new/post');
}

if(document.querySelector('#addPost')){
    document.querySelector('#addPost').addEventListener('click', newPost);
}


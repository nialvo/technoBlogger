

async function newPost (event){
    event.preventDefault();
    document.location.replace('/new/post');
}
document.querySelector('#newPost').addEventListener('click', newPost);


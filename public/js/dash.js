

async function newPost (event){
    event.preventDefault();
    document.location.replace('/new');
}
document.querySelector('#newPost').addEventListener('click', newPost);


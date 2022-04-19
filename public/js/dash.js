//get addPost button, add event handler

async function newPost (event){
    event.preventDefault();
    document.location.replace('/new');
}
document.querySelector('#newPost').addEventListener('click', newPost);


//get viewPost button, add event handler 
document.querySelector('#smallPosts').addEventListener('click', function (e) {
    if(this.value) document.location.replace(`/post/${this.value}`);          
  })
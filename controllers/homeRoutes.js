const router = require('express').Router();
const { User, Post, Comment } = require('../models');


//homepage
router.get('/', async (req, res) => {
    try {
        const data = await Post.findAll({ include: [{ model: User }] });
        let posts = data.map((post) => {
            post = post.get({ plain: true });
            console.log(post);
            date = post.date_created.split('-');
            post.date_created = `${date[1]}/${date[2]}/${date[0]}`;
            post.name = post.user.name;
            if(post.user_id==req.session.user_id)post.mine=true;
            else post.mine=false;
            if(post.commentNum==1)post.oneComment=true;
            else post.oneComment=false;
            if(post.commentNum==0)post.zeroComments=true;
            else post.zeroComments=false;
            return post;
        });
        res.render('home', {
            pageTitle: "The Technology Weblog",
            loggedIn: req.session.logged_in,
            posts
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//dashboard
router.get('/dash', async (req, res) => {
    try {
        const dbPostData = await User.findByPk(req.session.user_id, { include: [{ model: Post }] });
        let posts = [];
        if (dbPostData && dbPostData.posts && dbPostData.posts.length) {
            posts = dbPostData.posts.map((post) => {
                post = post.get({ plain: true });
                post.name = dbPostData.dataValues.name;
                date = post.date_created.split('-');
                post.date_created = `${date[1]}/${date[2]}/${date[0]}`;
                if(post.commentNum==1)post.oneComment=true;
                else post.oneComment=false;
                if(post.commentNum==0)post.zeroComments=true;
                else post.zeroComments=false;
                return post;
            });
        }
        res.render('dash', {
            pageTitle: "My Dashboard",
            loggedIn: req.session.logged_in,
            posts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//post entry
router.get('/new/post', async (req, res) => {
    try {
        res.render('newPost', {
            pageTitle: "New Post",
            loggedIn: req.session.logged_in
        });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});

//post edit
router.get('/edit/post/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, { raw: true });
        res.render('edit', {
            pageTitle: "Edit Post",
            loggedIn: req.session.logged_in,
            post,
            editButton: `<button id="editPost" type="button" class="myButtons" onclick="edit(${req.params.id})" class="submitButton">Edit</button>`,
            deleteButton: `<button id="deletePost" type="button" class="myButtons" onclick="deletePost(${req.params.id})" class="submitButton">Delete</button>`
        });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});

//comment entry
router.get('/new/comment/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment, include: [User] }]
        });

        if (postData===null){
            res.status(404).json('Post not found');
            return;
        }

        let post = postData.dataValues;
        post.author = postData.dataValues.user.name;
        post.edit=`<a href="/new/comment/${post.id}">Add Comment</a>`
        if(post.commentNum==1)post.oneComment=true;
        else post.oneComment=false;

        res.render('newComment', {
            post,
            pageTitle: "New Comment",
            loggedIn: req.session.logged_in,
            send: `<button type="button" id="submitButton" class="myButtons" onclick="newComment(${req.params.id})" >Comment</button>`//need quotes for function?
        });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});

//comment edit
router.get('/edit/comment/:id/:postid', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.postid, {
            include: [{ model: User }, { model: Comment, include: [User] }]
        });

        if (postData===null){
            res.status(404).json('Post not found');
            return;
        }

        let post = postData.dataValues;
        post.author = postData.dataValues.user.name;
        post.edit=`<a href="/new/comment/${post.id}">Add Comment</a>`
        if(post.commentNum==1)post.oneComment=true;
        else post.oneComment=false;
        

        const comment = await Comment.findByPk(req.params.id, { raw: true });
        res.render('editComment', {
            post,
            pageTitle: "Edit Comment",
            content:comment.content,
            loggedIn: req.session.logged_in,
            editButton: `<button id="editPost" type="button" class="myButtons" onclick="editComment(${req.params.id},${req.params.postid})" class="submitButton">Edit</button>`,
            deleteButton: `<button id="deletePost" type="button" class="myButtons" onclick="deleteComment(${req.params.id},${req.params.postid})" class="submitButton">Delete</button>`
        });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});

//individual post display
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment, include: [User] }]
        });

        if (postData===null){
            res.status(404).json('Post not found');
            return;
        }

        let post = postData.dataValues;
        post.author = postData.dataValues.user.name;
        post.edit=`<a href="/new/comment/${post.id}">Add Comment</a>`
        if(post.commentNum==1)post.oneComment=true;
        else post.oneComment=false;
        
        let comments = post.comments;
        comments = comments.map((comment)=>{
            comment = comment.get({plain:true});
            comment.author=comment.user.name;
            if(comment.user_id==req.session.user_id)comment.mine=true;
            else comment.mine=false;
            comment.edit=`<a href="/edit/comment/${comment.id}/${post.id}">Edit or Delete Comment</a>`
            return comment;
        });
        post.comments=comments;

        res.render('post', {
            loggedIn: req.session.logged_in,
            post,
            
        });

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//signup
router.get('/signup', async (req, res) => {
    try {
        res.render('signup', { pageTitle: "sign up" });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});

//login
router.get('/login', async (req, res) => {
    try {
        res.render('login', { pageTitle: "The Tech Blog" });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});


module.exports = router;

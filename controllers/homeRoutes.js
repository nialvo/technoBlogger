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
router.get('/new', async (req, res) => {
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
router.get('/edit/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, { raw: true });
        res.render('edit', {
            pageTitle: "Edit Post",
            loggedIn: req.session.logged_in,
            post
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

        let comments = post.comments;
        comments = comments.map((comment)=>{
            comment = comment.get({plain:true});
            comment.author=comment.user.name;
            if(comment.user_id==req.session.user_id)comment.mine=true;
            else comment.mine=false;
    
            
            return comment;
        });
        post.comments=comments;
        
        res.render('post', {
            loggedIn: req.session.logged_in,
            post
        });

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//comment entry
router.get('/new/comment/:id', async (req, res) => {
    try {
        res.render('newComment', {
            pageTitle: "New Comment",
            loggedIn: req.session.logged_in,
            id: req.params.id
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
        res.render('editComment', {
            pageTitle: "Edit Comment",
            loggedIn: req.session.logged_in,
            id: req.params.id,
            postid: req.params.postid
        });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
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

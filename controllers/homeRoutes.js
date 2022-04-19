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

//individual post display////////////////////////////////////////////////////////////////////////////////////////////test this dude
/*router.get('/post/:id', async (req, res) => {
    try {
        const postComments = await Post.findByPk(req.params.id, { include: [{ model: Comment }] });
        res.status(200).json(postComments);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});*/
//individual post display////////////////////////////////////////////////////////////////////////////////////////////test this dude
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment, include: [User] }]
        });

        if (postData===null){
            res.status(404).json('Post not found');
            return;
        }

        post = postData.dataValues;//?need this??
        post.author = postData.dataValues.user.name;
        delete post.user;//???????
        comments = post.comments;

        comments = comments.map((comment)=>{
            comment = comment.get({plain:true});
            comment.commentor_name=comment.user.name;
            delete comment.user;
            date = comment.date_created.split('-');
            comment.date_created = `${date[1]}/${date[2]}/${date[0]}`;
            return comment;
        }
        );

        post.comments=comments;
        date = post.date_created.split('-');
        post.date_created = `${date[1]}/${date[2]}/${date[0]}`;
        console.log(post);

        res.render('post', {
            
            loggedIn: req.session.logged_in,
            post
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

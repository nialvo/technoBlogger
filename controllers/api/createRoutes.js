const router = require('express').Router();
const { Post, Comment } = require('../../models');

//create post
router.post('/post', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.status(400).json("User not logged in");
            return;
        }
        req.body.user_id = req.session.user_id;
        const newPost = await Post.create(req.body);
        res.status(200).json(newPost);
    }
    catch (err) {;
        res.status(400).json(err);
    }
});

//create comment
router.post('/comment/:id', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.status(400).json("User not logged in");
            return;
        }
        req.body.user_id = req.session.user_id;
        req.body.post_id = req.params.id;

        const thePost = await Post.findByPk(req.params.id);
        const num = thePost.commentNum + 1;

        const theNewPost =await Post.update(
            {
                commentNum: num
            }, 
            {
                where: {id: req.params.id}
            }
        )
    
        const newComment = await Comment.create(req.body);
        res.status(200).json(newComment);
    }
    catch (err) {
        res.status(407).json(err);
    }
});


module.exports = router;

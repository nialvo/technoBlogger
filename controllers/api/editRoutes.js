const router = require('express').Router();
const { Post, Comment } = require('../../models');

//update post
router.put('/post/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!updatedPost) {
            res.status(404).json({ message: 'Whoopsie daisy' });
            return;
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

//delete post
router.delete('/post/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json(deletedPost);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
});

//update comment
router.put('/comment/:id', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.status(400).json("User is not logged in");
            return
        }
        req.body.user_id = req.session.user_id;
        const updatedComment = await Comment.update(req.body, {
            where: { id: req.params.id }
        });
        res.status(200).json(updatedComment);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    
});

//delete comment
router.put('/comment/delete/:id', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.status(400).json("User is not logged in");
            return
        }
        req.body.user_id = req.session.user_id;
        const deletedComment = await Comment.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json(deletedComment);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    
});

module.exports = router;
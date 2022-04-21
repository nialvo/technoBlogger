const router = require('express').Router();
const { Post, Comment } = require('../../models');

//delete post
router.delete('/post/:id', async (req, res) => {
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

//delete comment
router.delete('/comment/:id/:postid', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.status(400).json("User is not logged in");
            return
        }
        req.body.user_id = req.session.user_id;

        const thePost = await Post.findByPk(req.params.postid);
        const num = thePost.commentNum - 1;

        const theNewPost =await Post.update(
            {
                commentNum: num
            }, 
            {
                where: {id: req.params.postid}
            }
        )


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
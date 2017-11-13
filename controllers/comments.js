// comments.js (redditTutorial/controllers)

module.exports = ((app) => {

    // CREATE
    app.post('/posts/:postId/comments', (req, res) => {
        // INSTANTIATE INSTANCE OF MODEL
        let comment = new Comment(req.body);

        Post.findById(req.params.postId).populate("comments").exec((err, post) => {
            comment.save((err, comment) => {
                post.comments.unshift(comment);
                post.save();
    
                return res.redirect("/posts/" + post._id);
            })
        });
    });
});

let Comment = require('../models/comment');

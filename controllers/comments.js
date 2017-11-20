// comments.js (redditTutorial/controllers)

let Comment = require("../models/comment");

module.exports = ((app) => {
    // CREATE
    app.post("/posts/:id/comments", (req, res) => {
        // INSTANTIATE INSTANCE OF MODEL
        let comment = new Comment(req.body);

        Post.findById(req.params.id).populate("comments").exec((err, post) => {
            comment.save((err, comment) => {
                post.comments.unshift(comment);
                post.save();
    
                return res.redirect("/posts/" + post._id);
            })
        });
    });
});

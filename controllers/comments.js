// comments.js (redditTutorial/controllers)

const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");
const mongoose = require("mongoose");

module.exports = (app) => {
    app.post('/posts/:id/comments', (req, res) => {
        let id = req.params.id;
        console.log(req.body.userId);

        if (req.body.userId == 0) {

            var user = new User({
                username: "anonymous",
                password: "none"
            });

            let comment = new Comment({
                content: req.body.content,
                author: user.username,
                authorId: req.body.userId
            });

            Post
                .findById(req.params.id)
                .exec((err, post) => {
                    post.comments.unshift(comment);
                    post.save();
                    console.log('CONTENT')
                    console.log(comment.content);
                    return res.redirect(`/posts/${id}`);
                })
                .catch((err) => {
                    console.error(err.message);
                });
        } 
        else {

            let author = User
                .findById(req.body.userId)
                .exec()
                .then((user) => {

                    let comment = new Comment({
                        content: req.body.content,
                        author: user.username,
                        authorId: req.body.userId
                    });

                    Post
                        .findById(req.params.id)
                        .exec((err, post) => {
                            post.comments.unshift(comment);
                            post.save();
                            console.log('CONTENT')
                            console.log(comment.content);
                            return res.redirect(`/posts/${id}`);
                        })
                        .catch((err) => {
                            console.error(err.message);
                        });
                });
        }
    });
  };

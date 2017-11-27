// controllers/posts.js (redditTutorial)
// Controller for manipulating/CRUDing a post model

const Post = require("../models/post");
const User = require("../models/user");
const mongoose = require("mongoose");

module.exports = (app) => {
    app.put("posts/:id/vote-up", (req, res) => {
        console.log("Upvote");

        Post
            .findById(req.params.id)
            .exec((err, post) => {
                post.upvotes.push(req.user.id);
                post.voteScore = post.voteTotal + 1;
                post.save();

                res.status(200);
            })
            .catch((err) => {
                console.error(err.message);
            });
    });

    app.put("posts/:id/vote-down", (req, res) => {
        console.log("Downvote");

        Post
            .findById(req.params.id)
            .exec((err, post) => {
                post.downvotes.push(req.user.id);
                post.voteScore = post.voteTotal - 1;
                post.save();

                res.status(200);
            })
            .catch((err) => {
                console.error(err.message);
            });
    });

    app.post("/posts", (req, res) => {
        console.log(req.body.userId);

        if (req.body.userId == 0) {
            let user = new User({
                username: "anonymous",
                password: "none"
            });

            let post = new Post({
                title: req.body.title,
                summary: req.body.summary,
                subreddit: req.body.subreddit,
                author: user
            });

            post.save((err, post) => {
                if (err) {
                    console.error(err.message);

                    return res.redirect("/posts/new");
                }

                console.log("Post was saved successfully.");
                let id = post._id;
                return res.redirect(`/posts/${id}`);
            });
        }
        else {
            let author = User
                .findById(req.body.userId)
                .exec()
                .then((user) => {
                    let post = new Post({
                        title: req.body.title,
                        summary: req.body.summary,
                        subreddit: req.body.subreddit,
                        author: user
                    });

                    post.save((err, post) => {
                        if (err) {
                            console.error(err.message);

                            return res.redirect("/posts/new");
                        }

                        console.log("Post was saved successfully.");
                        let id = post._id;
                        return res.redirect(`/posts/${id}`);
                    });
                });
        }
    });
}
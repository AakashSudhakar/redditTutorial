// controllers/posts.js (redditTutorial)
// Controller for manipulating/CRUDing a post model

const Post = require("../models/post");

module.exports = (app) => {

    // GET request for displaying all posts (posts-index) on home page
    app.get("/", (req, res) => {
        Post
            .find({})
            .then((posts) => {
                res.render("posts-index", { posts });
            })
            .catch((err) => {
                console.error(err.message);
            });
    });

    // GET request for displaying new form page for new post (posts-new)
    app.get("/posts/new", (req, res) => {
        res.render("posts-new", { });
    });

    // POST request for saving user inputted req data and creating new post resource
    app.post("/posts", (req, res) => {

        Post
            .create(req.body)
            .then((post) => {
                res.redirect(`/posts/${post._id}`);
            })
            .catch((err) => {
                console.error(error.message);
            })
    });

    // GET request for showing a specific post
    app.get("/posts/:id", (req, res) => {
        Post
            .findById(req.params.id)
            .then((post) => {
                res.render("posts-show", { post });
            })
            .catch((err) => {
                console.error(error.message);
            });
    });
}
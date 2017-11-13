// models/post.js (redditTutorial)
// Model for a post

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Mongoose model that stores each Reddit post data
var Post = mongoose.model("Post", {
    title: String,
    desc: String,
    subreddit: String, 
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = Post;
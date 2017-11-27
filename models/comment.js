// comment.js (redditTutorial/models)


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    content:    { type: String, required: true },
    author:     { type: String, required: true },
    authorId:   { type: String, required: true },
    comments:   [ this ]
});

module.exports = mongoose.model("Comment", CommentSchema);

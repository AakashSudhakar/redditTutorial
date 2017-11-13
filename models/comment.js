// comment.js (redditTutorial/models)


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    content: { type: String, required: true }
});

module.exports = mongoose.model("Comment", CommentSchema);
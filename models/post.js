// models/post.js (redditTutorial)
// Model for a post

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comment");

// Mongoose model that stores each Reddit post data
let PostSchema = new Schema({
    title           : { type: String, required: true },
    summary         : { type: String, required: true },
    subreddit       : { type: String, required: true },
    author          : { type: Schema.Types.ObjectId, ref: 'User', required: false },
    comments        : [ Comment.schema ],
    downVotes       : [ String ],
    upVotes         : [ String ],
    voteTotal       : { type: Number, default: 0 }
});

module.exports = mongoose.model('Post', PostSchema);
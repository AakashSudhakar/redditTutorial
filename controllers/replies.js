// replies.js (redditTutorial/controllers)

const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");


module.exports = (app) => {

    app.post('/posts/:postId/comments/:commentId/replies', (req, res, next) => {
      const postId = req.params.postId;
      const commentId = req.params.commentId;
  
      Post
        .findById(postId)
        .then((err, post) => {
            const findComment = (id, comments) => {
                
                if (comments.length > 0) {
                    for (let i = 0; i < comments.length; i++) {
                        const found = comments[i];

                        if (found._id == id) {
                            console.log(`Commend found: ${found._id}`);
                            return found;
                        }

                        const nextLevelComment = findComment(id, comments[i].comments);
                        
                        if (nextLevelComment) {
                            return nextLevelComment;
                        }
                    }
                }
            }
  
            const comment = findComment(commentId, post.comments);
  
            let username = "";
            let userId = 0;

            if (!req.user) {
                const author = new User({
                    username: "anonymous",
                    password: "none",
                });
          
                username = author.username;
                console.log(username);
  
                const reply = new Comment({
                    content: req.body.content,
                    author: username,
                    authorId: userId,
                    postId: postId
                });
  
                comment.comments.push(reply);
                post.markModified('comments');
                return post.save();
            }
            else {

                userId = req.user.id;
                
                User
                    .findById(userId)
                    .then((user) => {
                        let username = user.username;
  
                        const reply = new Comment({
                            content: req.body.content,
                            author: username,
                            authorId: userId,
                            postId: postId
                        });
  
                        comment.comments.push(reply);
                        post.markModified('comments');
                        return post.save();
                    })
            }
        })
        .then(() => {
            res.redirect(`/posts/${postId}`);
        })
        .catch((err) => {
            console.error(err.message);
        });
    });
}
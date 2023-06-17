const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create  = function(req, res){
    // first find post id then create a comment
    Post.findById(req.body.post)
    .then(post =>{
    Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
    })
       .then(comment =>{
        post.comments.push(comment);
        post.save();
        res.redirect('/');
       })
       .catch(err =>{
         console.log("Can't create a comment", err)
       });
    })
    .catch(err =>{
       console.log("Can't find post", err)
    });
};
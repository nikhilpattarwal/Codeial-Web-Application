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

module.exports.destroy= function(req, res){
  Comment.findById(req.params.id)
  Post.findById(req.params.id)
  .then(comment =>{
  
    if(comment.user == req.user.id){
      //before del the comment we need to fetch the post id of comment because we need to go inside the post and find the comment and delete it 
         let postId = comment.post;
         
         comment.deleteOne()

         Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}})
         .then(post=>{
          return res.redirect('back');
         })
    }else{
      return res.redirect('back');
    }
  });
}
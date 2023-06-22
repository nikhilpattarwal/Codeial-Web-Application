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
        req.flash('success', 'Comment created successfully')
        res.redirect('/');
       })
       .catch(err =>{
         req.flash('error', 'Cannot create comment');
       });
    })
    .catch(err =>{
      req.flash('error', 'Cannot find post')
    });
};

module.exports.destroy= function(req, res){
  // Post.findById(req.params.id)
  Comment.findById(req.params.id)
  
 
  .then(comment =>{
    if(comment.user == req.user.id){
      //before del the comment we need to fetch the post id of comment because we need to go inside the post and find the comment and delete it 
         let postId = comment.post;
         comment.deleteOne()
         Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}})
         .then(post=>{
          req.flash('error', 'Comment deleted successfully')
          return res.redirect('back');
         })
    }else{
      req.flash('error', 'Cannot delete comment')
      return res.redirect('back');
    }
  });
}
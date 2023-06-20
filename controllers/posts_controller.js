const Post = require('../models/post');
// const { post } = require('../routes');
const Comment = require('../models/comment')

module.exports.create = function(req, res){
     Post.create({
          content: req.body.content,
          user: req.user._id
     })
     .then(function(post){
          return res.redirect('back');
     })

      .catch(function(err){
          console.log('Error in Creating A Post');
     })
}


//destroy
module.exports.destroy = function(req, res){
     Post.findById(req.params.id)
     .then(function(post){
      //check the user who has posted is also deleting, else nobody can delete post from my id
      if(post.user == req.user.id){ // when we comapre two ids we need to convert them to string so mongoose giv .id which automaticall convert it to string
          post.deleteOne()
            .then(function() {
               // Delete associated comments
               return Comment.deleteMany({ post: req.params.id });
             })
             .then(function() {
               return res.redirect('back');
             })
         
      }else{
          return res.redirect('back');
      }
     })
}
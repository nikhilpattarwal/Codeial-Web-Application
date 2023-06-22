const Post = require('../models/post');
// const { post } = require('../routes');
const Comment = require('../models/comment')

module.exports.create = async function(req, res){

     try{
          await Post.create({
               content: req.body.content,
               user: req.user._id
          })
               req.flash('success','Post Published!');
               return res.redirect('back');

     } catch(err){

         req.flash('Error', err);
           return;
     }
     
     
}


//destroy
module.exports.destroy = async function(req, res){

     try{
          let post = await Post.findById(req.params.id);
          //check the user who has posted is also deleting, else nobody can delete post from my id
          if(post.user == req.user.id){ // when we comapre two ids we need to convert them to string so mongoose giv .id which automaticall convert it to string
              post.deleteOne()
                
              // Delete associated comments
              await Comment.deleteMany({ post: req.params.id });
              req.flash('success', 'Post and associated comments deleted')
              return res.redirect('back');
          }else{
               req.flash('Error', 'You cannot delete this post!');
              return res.redirect('back');
          }

     }catch(err){

          req.flash('Error', err);
          return;

     }
    
}
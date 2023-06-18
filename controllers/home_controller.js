const Post = require('../models/post');

module.exports.home = function(req, res){

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path:'user'
        }
    })
    .then(function(posts){
        console.log(posts);
        return res.render('home',{
            title: "Codeial | Home",
            posts: posts
    })
   
    });
}


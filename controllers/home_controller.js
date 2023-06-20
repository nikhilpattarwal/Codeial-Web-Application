const Post = require('../models/post');
const User = require('../models/user');

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

        User.find({})
        .then(users =>{
            return res.render('home',{
                title: "Codeial | Home",
                posts: posts,
                all_users: users
        });
        });
        
       
   
    });
}


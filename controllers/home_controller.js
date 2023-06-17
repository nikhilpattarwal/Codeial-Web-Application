const post = require('../models/post');

module.exports.home = function(req, res){

    post.find({}).populate('user')
    .then(function(posts){
        return res.render('home',{
            title: "Codeial | Home",
            posts: posts
    })
   
    });
}


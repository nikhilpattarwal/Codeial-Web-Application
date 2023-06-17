const passport = require('passport');
const User = require('../models/user');

module.exports.profile = function(req, res){
    // return res.end('<h1> Users Profile</h1>');
    
    // if(req.isAuthenticated()){
    //   return res.redirect('/users/profile');
    // }

    return res.render('users',{
        title:"Users"
    });
}

// render the signUp page
module.exports.signUp= function(req, res){

  if(req.isAuthenticated()){
    return res.redirect('/users/profile')
   }
   
    return res.render('user_sign_up',{
        title:("Codeial | Sign Up")
    })
}

// render the signin page
module.exports.signIn = function(req,res){
   if(req.isAuthenticated()){
    return res.redirect('/users/profile')
   }

    return res.render('user_sign_in',{
        title:("Codeial | Sing In")
    })
}


// get the sign-up data
module.exports.create = function (req, res) {
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect('back');
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.redirect('back');
      } else {
        return User.create(req.body)
          .then(newUser => {
            return res.redirect('/users/sign-in');
          })
          .catch(err => {
            console.log("Error in signing up:", err);
            return res.redirect('back');
          });
      }
    })
    .catch(err => {
      console.log("Error in finding user in signing up:", err);
      return res.redirect('back');
    });
};
 


//sigm-in and create a session for user
module.exports.createSession = function(req, res){
 return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
  req.logout(function(err) {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    return res.redirect('/');
  });
};

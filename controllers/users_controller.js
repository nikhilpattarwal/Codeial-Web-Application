const passport = require('passport');
const User = require('../models/user'); 

module.exports.profile = function(req, res){
    // return res.end('<h1> Users Profile</h1>');
    // if(req.isAuthenticated()){
    //   return res.redirect('/users/profile');
    // }
    User.findById(req.params.id)
      .then(user =>{
        return res.render('users',{
        title:"Users",
        profile_user: user
      });
    })

   
}

module.exports.update = function(req,res){
  if(req.user.id = req.params.id){
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(user =>{
      return res.redirect('back')
    })
  }else{
    return res.status(401).send('Unauthorized');
  }
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
  req.flash('success', 'Logged in Successfully')
 return res.redirect('/');
}

module.exports.destroySession = function(req, res) {

  req.logout(function(err) {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    req.flash('success','You have logged out')
    return res.redirect('/');
  });
};

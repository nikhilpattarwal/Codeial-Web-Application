const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback :true
}, async (req, email, password, done) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user || user.password !== password) {
            req.flash('error', 'Invalid Username/Password');
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        req.flash('error', err);
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user');
        return done(err);
    }
});

//check if the user is authenticated 

passport.checkAuthentication = function(req, res, next){
    //if user is sign-in then pass on the req to nect function(controller's action)

    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed-in
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        // console.log("inside set ", req.user)
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;

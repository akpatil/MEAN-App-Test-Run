var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function(){
	passport.use(new localStrategy(function(username, password, done){
		User.findOne({
			username: username
		}, function(err, user){
			if(err)
				return done(err);

			if(!user)
				return done(null, false, {
					message: 'Invalid user!'
				});

			if(!user.authenticate(password)){
				return done(null, false, {
					message: 'Invalid password!'
				});	
			};
			return done(null, user);
		});
	}));
};
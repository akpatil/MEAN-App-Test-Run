var User = require('mongoose').model('User');

var getErrorMessage = function(err){
	var message = '';

	if(err.code){
		switch(err.code){
			case 11000:
			case 11001:
				message = 'Username already exists!'
				break;
			default:
				message = 'Something went wrong!'
		}
	}
	else {
		for(var errName in err.errors){
			if(err.errors[errName].message)
				return err.errors[errName].message;
		}
	}
	return message;
};

exports.renderSignin = function(req, res, next){
	if(!req.user){
		res.render('signin', {
			title: 'Signin Title',
			messages: req.flash('error') || req.flash('info')
		});
	}
	else {
	return res.redirect('/');	
	}
};

exports.renderSignup = function(req, res, next){
	if(!req.user){
		res.render('signup', {
			title: 'Signup Title',
			messages: req.flash('error')
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.signup = function(req, res, next){
	if(!req.user){
		var user = new User(req.body);
		var message = null;

		user.provider = 'local';

		user.save(function(err){
			if(err) {
				var message =  getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/signup');
			}
			req.login(user, function(err){
				if(err)
					return next(err);
				return res.redirect('/');
			});
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.signout = function(req, res){
	req.logout();
	res.redirect('/');
};

exports.create = function(req, res, next){
	var user = new User(req.user);

	user.save(function(err, user){
		if(err)
			return next(err);
		else
			res.json(user);
	});
};

exports.list = function(req, res, next){
	User.find({}, function(err, users){
		if(err)
			return next(err);
		else
			res.json(users);
	});
};

exports.read = function(req, res, next){
	res.json(req.user);
};

exports.readByID = function(req, res, next){
	User.findById({
		_id: id
	}, function(err, user){
		if(err)
			return next(err);
		else {
			req.user = user;
			next();
		}
	});
};

exports.update = function(req, res, id, next){
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
		if(err)
			return next(err);
		else
			res.json(user);
	});
};

exports.delete = function(req, res, next){
	req.user.remove(function(err){
		if(err)
			return next(err);
		else
			res.json(req.user);
	});
};

exports.requiresLogin = function(req, res, next){
	if(!req.isAuthenticated){
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	next();
};
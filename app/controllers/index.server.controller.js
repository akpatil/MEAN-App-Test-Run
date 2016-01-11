exports.render = function(req, res, next){
	res.render('index', {
		title: 'Index title',
		//userFullname: req.user ? req.user.fullname : ''
		user: JSON.stringify(req.user)
	});
};
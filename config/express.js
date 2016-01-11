var express = require('express'),
	config = require('./config'),
	bodyParser = require('body-parser'),
	compress = require('compression'),
	flash = require('connect-flash'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	morgan = require('morgan'),
	passport = require('passport');

module.exports = function(){
	var app = express();
	if(process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));
	}
	else if(process.env.NODE_ENV === 'production'){
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	app.use(methodOverride());

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(express.static('./public'));

	require ('../app/routes/index.server.route')(app);
	require ('../app/routes/user.server.route')(app);
	require ('../app/routes/article.server.route')(app);

	return app;
};	
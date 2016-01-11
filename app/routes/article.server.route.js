var User = require('../controllers/user.server.controller');
var Article = require('../controllers/article.server.controller');

module.exports = function(app){
	app.route('/api/article').get(Article.list).post(User.requiresLogin, Article.create);
	app.route('/api/article/:articleID').get(Article.read).put(User.requiresLogin, Article.hasAuthorization, Article.update).delete(User.requiresLogin, Article.hasAuthorization, Article.delete);
	app.param('articleID', Article.readByID);
};
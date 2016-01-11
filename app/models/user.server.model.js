var Schema = require('mongoose').Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	email: {
		type: String,
		match: [/.+\@.+\..+/, 'Please fill in a valid email address']
	},
	username: {
		type: String,
		trim: true,
		unique: true,
		required: 'Username is required'
	},
	password: {
		type: String,
		validate: [function(password){
			return password && password.length > 6;
		}, 'Password should be longer than 6 characters']
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'provider is required'
	},
	providerId: {
		type: String
	},
	providerData: {},
	created: {
		type: Date,
		default: Date.now
	}
});

UserSchema.virtual('fullname').get(function(){
	return this.firstName + ' ' + this.lastName;
}).set(function(fullname){
	var split = fullname.split(' ');
	firstName = split[0] || '';
	lastName = split[1] || '';
});

UserSchema.pre('save', function(next){
	if(this.password){
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

UserSchema.methods.hashPassword = function(password){
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password){
	return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix,
callback) {
var _this = this;
var possibleUsername = username + (suffix || '');
_this.findOne({
username: possibleUsername
}, function(err, user) {
if (!err) {
if (!user) {
callback(possibleUsername);
} else {
return _this.findUniqueUsername(username, (suffix || 0) +
1, callback);
}
} else {
callback(null);
}
});
};

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
})

require('mongoose').model('User', UserSchema);
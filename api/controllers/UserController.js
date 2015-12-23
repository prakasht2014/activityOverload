/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'new': function(req, res){
		return res.view();
	},

	'create': function(req, res){
		// Create a User with the params sent from
		// the sign-up form --> new.ejs
		User.create(req.params.all(), function userCreated(err, user){
			if (err) {
				req.session.flash = {
					err: err
				};
				// If error redirect back to sign-up apge
				return res.redirect('/user/new');
			}
			// After successfully creating the user
			// redirect to the show action
			return res.redirect('/user/show/' + user.id);
		});
	},

	'show': function(req, res, next){
		User.findOne(req.param('id'), function foundUser(err, user){
			if (err) return next(err);
			if (!user) return next();
			res.view({
				user: user
			});
		});
	}
};

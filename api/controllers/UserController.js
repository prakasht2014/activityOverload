/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'new': function(req, res){
		res.view();
	},

	create: function(req, res, next){

		// Create a User with the params sent from
		// the sign-up form --> new.ejs
		User.create(req.params.all(), function userCreated(err, user){
			// If there's an error
			if (err) return next(err);

			// After successfully creating the user
			// redirect to the show action
			res.json(user);
		});
	}
};

/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    'new': function (req, res) {
        return res.view();
    },

    'create': function (req, res) {
        // Create a User with the params sent from
        // the sign-up form --> new.ejs
        User.create(req.params.all(), function userCreated(err, user) {
            if (err) {
                req.session.flash = {
                    err: err
                };
                // If error redirect back to sign-up page
                return res.redirect('/user/new');
            }
            // After successfully creating the user
            // redirect to the show action
            return res.redirect('/user/show/' + user.id);
        });
    },

    'show': function (req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();

            return res.view({
                user: user
            });
        });
    },

    'index': function (req, res, next) {
        
        // Get an array of all users in the User collection(e.g. table)
        User.find(function foundUsers(err, users) {
            if (err) return next(err);
            // Pass the array down to the /views/index.ejs page
            return res.view({
                users: users
            });
        });
    },

    // Render the edit view
    'edit': function (req, res, next) {
        // Find the user from the id passed in via params
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next('User doesn\'t exist.');

            return res.view({
                user: user
            });
        });
    },

    // Process the info from edit view
    'update': function (req, res, next) {
        User.update(req.param('id'), req.params.all(), function userUpdated(err) {
            if (err) {
                return res.redirect('/user/edit/' + req.param('id'));
            }

            return res.redirect('/user/show/' + req.param('id'));
        });
    },

    'destroy': function (req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next('User doesn\'t exist.');

            User.destroy(req.param('id'), function userDestroyed(err) {
                if (err) return next(err);
            });

            return res.redirect('/user');
        });
    }
};

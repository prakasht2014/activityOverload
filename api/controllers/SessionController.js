var bcrypt = require('bcrypt');

module.exports = {

    'new': function (req, res) {

        return res.view('session/new');
    },

    'create': function (req, res, next) {
	    
        // Check for email and password in params sent via the form, if none
        // redirect the browser back to the sign-in form.
        if (!req.param('email') || !req.param('password')) {

            var usernamePasswordRequiredError = [{ 
                name: 'usernamePasswordRequired', 
                message: 'You must enter both a username and password.' 
            }];
	        
            // Remember that err is the object being passed down, whose value is another object with
            // the key of usernamePasswordRequiredError
            req.session.flash = {
                err: usernamePasswordRequiredError
            };

            return res.redirect('/session/new');
        }
        
        // Try to find the user by their email address.
        // findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute.
        User.findOneByEmail(req.param('email'), function foundUser(err, user) {
            if (err) return next(err);

            if (!user) {
                var noAccountError = [{ 
                    name: 'noAccount', 
                    message: 'The email address ' + req.param('email') + ' not found.' 
                }];
                req.session.flash = {
                    err: noAccountError
                };
                return res.redirect('/session/new');
            }
           
            // Compare password from the form params to the encrypted password of the user found.
            bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {               
                if (err) return next(err);
                
                if (!valid) {
                    var usernamePasswordMismatchError = [{
                        name: 'usernamePasswordMismatch', 
                        message: 'Invalid username and password combination.'
                    }];
                    req.session.flash = {
                        err: usernamePasswordMismatchError
                    };
                    return res.redirect('/session/new');
                }
                
                // Log user in
                req.session.authenticated = true;
                req.session.User = user;
                
                // Redirect to their profile page
                return res.redirect('/user/show/' + user.id);
            });
        });
    },
    
    'destroy': function(req, res, next) {
        
        // Wipe out the session (log out)
        req.session.destroy();
        res.redirect('/session/new');
    }
};
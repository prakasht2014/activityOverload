module.exports = {

	'new': function(req, res) {
        
        return res.view('session/new');
	},
	
	'create': function(req, res, next) {
	    
	    // Check for email and password in params sent via the form, if none
	    // redirect the browser back to the sign-in form.
	    if (!req.param('email') || !req.param('password')) {
	     
	        var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'You must enter both a username and password.'}];
	        
	        // Remember that err is the object being passed down, whose value is another object with
	        // the key of usernamePasswordRequiredError
	        return req.session.flash = {
	            err: usernamePasswordRequiredError
	        };
	        
	        return res.redirect('/session/new');
	    }
	}
};
module.exports = {

	'new': function(req, res){
        
        var oldDateObj = new Date();
        var newDateObj = new Date(oldDateObj.getTime() + 60000);
        req.session.cookie.expires = newDateObj;
        req.session.authenticated = true;
        console.log(req.session);
        
        return res.view('session/new');
	}
};